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
import { DepartmentService } from "../../../core/http/admin/department.service";
import { GroupService } from "../../../core/http/admin/group.service";
import { GroupModel } from "../../../shared/models/group.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"],
})
export class GroupComponent implements OnInit {
  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  departmentList: Array<DepartmentModel> = null;
  seriesList: Array<SeriesModel> = null;

  constructor(
    private fb: FormBuilder,
    private service: GroupService,
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
        name: [
          "",
          [Validators.required, Validators.pattern("^[A-Z0-9]*$")],
          [],
        ],
        stdyYr: [
          { value: "", disabled: true },
          [Validators.required, Validators.pattern("^[1-9]*$")],
          [],
        ],
        faculty: ["", [Validators.required], []],
        department: ["", [Validators.required], []],
        series: ["", [Validators.required], []],
      });
    } else {
      this.matForm = this.fb.group({
        group: ["", [Validators.required], []],
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

  loadDepts(event): void {
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

  loadSeries(event): void {
    this.seriesList = event.value.seriesList;

    if (this.seriesList.length == 0) {
      this.openConfirmDialog(
        "There is no series for this department. Please create a series first.",
        false,
        true
      )
        .afterClosed()
        .subscribe((confirm) => {
          if (confirm.event == "Yes") {
            this.router.navigate(["admin/series"], {
              state: { data: "add" },
            });
          }
        });
    }
  }

  updtStdyYear(event): void {
    this.matForm.controls.stdyYr.setValue(event.value.stdyYr);
  }

  selectOption(option: string): void {
    this.initializePage(option);
    this.initializeDatasource();
    this.optionPicked = true;
    this.option = option;
  }

  addGroup(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    let groupModel: GroupModel = new GroupModel();

    groupModel.name = this.matForm.controls.name.value;
    groupModel.series = this.matForm.controls.series.value;

    this.service.addGroup(groupModel).subscribe((response) => {
      dialogRef.close();
      let group: GroupModel = response;
      if (group.studentsList == null) {
        this.openDialog(
          "Successfully created the new " +
            group.name +
            " group with id " +
            group.grpId +
            ".",
          false
        );
      } else {
        this.openDialog(
          "Group " +
            group.name +
            " already exists with id " +
            group.grpId +
            ".",
          false
        );
      }
    });
  }
}
