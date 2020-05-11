import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { Dialog } from "../../../shared/models/dialog.model";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { SeriesModel } from "../../../shared/models/series.model";
import { SeriesService } from "../../../core/http/admin/series.service";
import { DepartmentModel } from "../../../shared/models/department.model";
import { FacultyService } from "../../../core/http/admin/faculty.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-series",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.scss"],
})
export class SeriesComponent implements OnInit {
  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  departmentList: Array<DepartmentModel> = null;

  constructor(
    private fb: FormBuilder,
    private service: SeriesService,
    private facultyService: FacultyService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
      disableClose: true,
    });
  }

  private openConfirmDialog(
    message: string,
    isLoading: boolean,
    confirmNeeded: boolean
  ): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading, "", confirmNeeded),
      disableClose: true,
    });
  }

  private initializePage(option: string): void {
    if (option == "add") {
      this.matForm = this.fb.group({
        name: ["", [Validators.required, Validators.pattern("^[A-Z]*$")], []],
        stdyYr: ["", [Validators.required, Validators.pattern("^[1-9]*$")], []],
        faculty: ["", [Validators.required], []],
        department: ["", [Validators.required], []],
      });
    } else {
      this.matForm = this.fb.group({
        series: ["", [Validators.required], []],
      });
    }
  }

  private initializeDatasource(): void {
    let dialogRef = this.openDialog("", true);
    this.facultyService.getFaculties().subscribe((response) => {
      dialogRef.close();
      this.facultyList = response;
    });
  }

  ngOnInit(): void {
    if (history.state.data !== undefined) {
      this.selectOption(history.state.data);
    }
  }

  loadDepts(event) {
    this.departmentList = event.value.departmentList;

    if (this.departmentList.length == 0) {
      this.openConfirmDialog(
        "There is no department for this faculty. Please create a department first.",
        false,
        true
      )
        .afterClosed()
        .subscribe((confirm) => {
          if (confirm.event == "Yes") {
            this.router.navigate(["admin/department"], {
              state: { data: "add" },
            });
          }
        });
    }
  }

  selectOption(option: string): void {
    this.initializePage(option);
    this.initializeDatasource();
    this.optionPicked = true;
    this.option = option;
  }

  addSeries(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    let seriesModel: SeriesModel = new SeriesModel();

    seriesModel.name = this.matForm.controls.name.value;
    seriesModel.stdyYr = this.matForm.controls.stdyYr.value;
    seriesModel.dept = this.matForm.controls.department.value;

    this.service.addSeries(seriesModel).subscribe((response) => {
      dialogRef.close();
      let series: SeriesModel = response;
      if (series.groupList == null) {
        this.openDialog(
          "Successfully created the new " +
            series.name +
            " series with id " +
            series.srsId +
            ".",
          false
        );
      } else {
        this.openDialog(
          "Series " +
            series.name +
            " already exists with id " +
            series.srsId +
            ".",
          false
        );
      }
    });
  }
}
