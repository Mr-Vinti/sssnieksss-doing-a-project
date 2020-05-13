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
import { StudentService } from "../../../core/http/admin/student.service";
import { StudentModel } from "../../../shared/models/student.model";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent implements OnInit {
  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  updtForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  departmentList: Array<DepartmentModel> = null;
  seriesList: Array<SeriesModel> = null;
  groupList: Array<GroupModel> = null;
  studentList: Array<StudentModel> = null;
  showPressed: boolean = false;
  openStudent: StudentModel;

  constructor(
    private fb: FormBuilder,
    private service: StudentService,
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
        faculty: ["", [Validators.required], []],
        department: ["", [Validators.required], []],
        series: ["", [Validators.required], []],
        group: ["", [Validators.required], []],
        firstName: [
          "",
          [Validators.required, Validators.pattern("^[A-Z][-a-zA-Z]*$")],
          [],
        ],
        lastName: [
          "",
          [Validators.required, Validators.pattern("^[A-Z][-a-zA-Z]*$")],
          [],
        ],
        fthrInit: [
          "",
          [Validators.required, Validators.pattern("^[A-Z]*$")],
          [],
        ],
        stdyYr: [
          { value: "", disabled: true },
          [Validators.required, Validators.pattern("^[1-9]*$")],
          [],
        ],
        cnp: ["", [Validators.required, Validators.pattern("^[0-9]{13}$")], []],
        phnNbr: [
          "",
          [Validators.required, Validators.pattern("^[+]?[0-9]{10,15}$")],
          [],
        ],
      });
    } else {
      this.matForm = this.fb.group({
        faculty: ["", [Validators.required], []],
        department: ["", [Validators.required], []],
        series: ["", [Validators.required], []],
        group: ["", [Validators.required], []],
        student: ["", [Validators.required], []],
      });
      this.updtForm = this.fb.group({
        firstName: [
          "",
          [Validators.required, Validators.pattern("^[A-Z][-a-zA-Z]*$")],
          [],
        ],
        lastName: [
          "",
          [Validators.required, Validators.pattern("^[A-Z][-a-zA-Z]*$")],
          [],
        ],
        fthrInit: [
          "",
          [Validators.required, Validators.pattern("^[A-Z]*$")],
          [],
        ],
        stdyYr: [
          { value: "", disabled: true },
          [Validators.required, Validators.pattern("^[1-9]*$")],
          [],
        ],
        cnp: ["", [Validators.required, Validators.pattern("^[0-9]{13}$")], []],
        phnNbr: [
          "",
          [Validators.required, Validators.pattern("^[+]?[0-9]{10,15}$")],
          [],
        ],
        userName: [
          "",
          [Validators.required, Validators.pattern("^[-a-z.0-9]*$")],
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

  loadGroups(event): void {
    this.groupList = event.value.groupList;

    if (this.groupList.length == 0) {
      this.openConfirmDialog(
        "There is no group for this series. Please create a group first.",
        false,
        true
      )
        .afterClosed()
        .subscribe((confirm) => {
          if (confirm.event == "Yes") {
            this.router.navigate(["admin/group"], {
              state: { data: "add" },
            });
          }
        });
    }
  }

  loadStudents(event): void {
    this.studentList = event.value.studentList;

    if (this.studentList.length == 0) {
      this.openConfirmDialog(
        "There is no student for this group. Please create a student first.",
        false,
        true
      )
        .afterClosed()
        .subscribe((confirm) => {
          if (confirm.event == "Yes") {
            this.router.navigate(["admin/student"], {
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

  addStudent(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    let studentModel: StudentModel = new StudentModel();

    studentModel.firstName = this.matForm.controls.firstName.value;
    studentModel.lastName = this.matForm.controls.lastName.value;
    studentModel.fatherInitial = this.matForm.controls.fthrInit.value;
    studentModel.cnp = this.matForm.controls.cnp.value;
    studentModel.phoneNumber = this.matForm.controls.phnNbr.value;
    studentModel.studyYear = this.matForm.controls.stdyYr.value;
    studentModel.group = this.matForm.controls.group.value;

    this.service.addStudent(studentModel).subscribe((response) => {
      dialogRef.close();
      let student: StudentModel = response;
      if (student.contractList == null) {
        this.openDialog(
          "Successfully created the new " +
            student.firstName +
            " " +
            student.lastName +
            " student with id " +
            student.stdId +
            ".",
          false
        );
      } else {
        this.openDialog(
          "Student " +
            student.firstName +
            " " +
            student.lastName +
            " already exists with id " +
            student.stdId +
            ".",
          false
        );
      }
    });
  }

  showStudent(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    this.showPressed = true;
    this.openStudent = this.matForm.controls.student.value;
    this.updtForm.controls.firstName.setValue(this.openStudent.firstName);
    this.updtForm.controls.lastName.setValue(this.openStudent.lastName);
    this.updtForm.controls.fthrInit.setValue(this.openStudent.fatherInitial);
    this.updtForm.controls.cnp.setValue(this.openStudent.cnp);
    this.updtForm.controls.phnNbr.setValue(this.openStudent.phoneNumber);
    this.updtForm.controls.userName.setValue(this.openStudent.userName);
    this.updtForm.controls.stdyYr.setValue(
      this.matForm.controls.series.value.stdyYr
    );
  }

  updateStudent(): void {
    if (!this.updtForm.valid) {
      this.updtForm.markAsTouched();
      return;
    }

    let studentModel: StudentModel = this.openStudent;
    studentModel.firstName = this.updtForm.controls.firstName.value;
    studentModel.lastName = this.updtForm.controls.lastName.value;
    studentModel.fatherInitial = this.updtForm.controls.fthrInit.value;
    studentModel.cnp = this.updtForm.controls.cnp.value;
    studentModel.phoneNumber = this.updtForm.controls.phnNbr.value;
    studentModel.userName = this.updtForm.controls.userName.value;
    studentModel.group = this.matForm.controls.group.value;
    studentModel.group.studentList = null;

    this.openConfirmDialog(
      "Are you sure you want to update this student?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.updateStudent(studentModel).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully updated this student", false);
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog("Successfully updated this student", false);
                } else if (err.error.text.includes("Student already exists")) {
                  this.openDialog(err.error.text, false);
                } else if (
                  err.error.text.includes("Student with that username")
                ) {
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

  deleteStudent(): void {
    this.openConfirmDialog(
      "Are you sure you want to delete this student?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.deleteStudent(this.openStudent.stdId).subscribe(
            () => {
              dialogRef.close();
              dialogRef = this.openDialog(
                "Successfully deleted this student",
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
                    "Successfully deleted this student",
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
