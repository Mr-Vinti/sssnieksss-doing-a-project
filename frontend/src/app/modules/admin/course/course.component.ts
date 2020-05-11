import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { Dialog } from "../../../shared/models/dialog.model";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { SeriesModel } from "../../../shared/models/series.model";
import { DepartmentModel } from "../../../shared/models/department.model";
import { FacultyService } from "../../../core/http/admin/faculty.service";
import { GroupModel } from "../../../shared/models/group.model";
import { Router } from "@angular/router";
import { CourseService } from "../../../core/http/admin/course.service";
import { CourseModel } from "../../../shared/models/course.model";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  departmentList: Array<DepartmentModel> = null;
  seriesList: Array<SeriesModel> = null;

  constructor(
    private fb: FormBuilder,
    private service: CourseService,
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
          [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")],
          [],
        ],
        teacher: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z ]*$")],
          [],
        ],
        semester: ["", [Validators.required], []],
        creditPoints: [
          "",
          [Validators.required, Validators.pattern("^[1-9]*$")],
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

  addCourse(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    let courseModel: CourseModel = new CourseModel();

    courseModel.name = this.matForm.controls.name.value;
    courseModel.creditPoints = this.matForm.controls.creditPoints.value;
    courseModel.semester = (this.matForm.controls.semester.value == "I" ? 1 : 2);
    courseModel.teacher = this.matForm.controls.teacher.value;
    courseModel.series = this.matForm.controls.series.value;
    courseModel.studyYear = this.matForm.controls.stdyYr.value;

    this.service.addCourse(courseModel).subscribe((response) => {
      dialogRef.close();
      let course: CourseModel = response;
      if (course.name != null) {
        this.openDialog(
          "Successfully created the new " +
            course.name +
            " course with id " +
            course.crsId +
            ".",
          false
        );
      } else {
        this.openDialog(
          "Course " +
            courseModel.name +
            " already exists with id " +
            course.crsId +
            ".",
          false
        );
      }
    });
  }
}
