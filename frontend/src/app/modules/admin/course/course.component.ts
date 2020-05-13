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
  updtForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  departmentList: Array<DepartmentModel> = null;
  seriesList: Array<SeriesModel> = null;
  courseList: Array<CourseModel> = null;
  showPressed: boolean = false;
  openCourse: CourseModel;

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
        faculty: ["", [Validators.required], []],
        department: ["", [Validators.required], []],
        series: ["", [Validators.required], []],
        course: ["", [Validators.required], []],
      });
      this.updtForm = this.fb.group({
        name: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")],
          [],
        ],
        stdyYr: [
          { value: "", disabled: true },
          [Validators.required, Validators.pattern("^[1-9]*$")],
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

  loadCourses(event): void {
    let dialogRef = this.openDialog("", true);
    this.service.getCourses(event.value.srsId).subscribe((response) => {
      dialogRef.close();
      this.courseList = response;
      if (this.courseList.length == 0) {
        this.openConfirmDialog(
          "There is no course for this department. Please create a course first.",
          false,
          true
        )
          .afterClosed()
          .subscribe((confirm) => {
            if (confirm.event == "Yes") {
              this.router.navigate(["admin/course"], {
                state: { data: "add" },
              });
            }
          });
      }
    });
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
    courseModel.semester = this.matForm.controls.semester.value == "I" ? 1 : 2;
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

  showCourse(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    this.showPressed = true;
    this.openCourse = this.matForm.controls.course.value;
    this.updtForm.controls.name.setValue(this.openCourse.name);
    this.updtForm.controls.teacher.setValue(this.openCourse.teacher);
    this.updtForm.controls.creditPoints.setValue(this.openCourse.creditPoints);
    this.updtForm.controls.semester.setValue(
      this.openCourse.semester == 1 ? "I" : "II"
    );
    this.updtForm.controls.stdyYr.setValue(
      this.matForm.controls.series.value.stdyYr
    );
  }

  updateCourse(): void {
    if (!this.updtForm.valid) {
      this.updtForm.markAsTouched();
      return;
    }

    let courseModel: CourseModel = this.openCourse;
    courseModel.name = this.updtForm.controls.name.value;
    courseModel.creditPoints = this.updtForm.controls.creditPoints.value;
    courseModel.semester = this.updtForm.controls.semester.value == "I" ? 1 : 2;
    courseModel.teacher = this.updtForm.controls.teacher.value;
    courseModel.series = this.matForm.controls.series.value;
    courseModel.series.groupList = null;

    this.openConfirmDialog(
      "Are you sure you want to update this course?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.updateCourse(courseModel).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully updated this course", false);
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog("Successfully updated this course", false);
                } else if (err.error.text.includes("Course already exists")) {
                  this.openDialog(err.error.text, false);
                } else {
                  this.openDialog(
                    "Unexpected error occured: " + err.error.text,
                    false
                  );
                }
              } else {
                this.openDialog(
                  err.error.error + ": " + err.error.message,
                  false
                );
              }
            }
          );
        }
      });
  }

  deleteGroup(): void {
    this.openConfirmDialog(
      "Are you sure you want to delete this course?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.deleteCourse(this.openCourse.crsId).subscribe(
            () => {
              dialogRef.close();
              dialogRef = this.openDialog(
                "Successfully deleted this course",
                false
              );
              dialogRef.afterClosed().subscribe(() => {
                this.selectOption("edit");
              });
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  dialogRef = this.openDialog(
                    "Successfully deleted this group",
                    false
                  );
                  dialogRef.afterClosed().subscribe(() => {
                    this.selectOption("edit");
                  });
                } else {
                  this.openDialog(
                    "Unexpected error occured: " + err.error.text,
                    false
                  );
                }
              } else {
                this.openDialog(
                  err.error.error + ": " + err.error.message,
                  false
                );
              }
            }
          );
        }
      });
  }
}
