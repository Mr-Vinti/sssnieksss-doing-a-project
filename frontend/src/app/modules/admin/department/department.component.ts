import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentModel } from "../../../shared/models/department.model";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { Dialog } from "../../../shared/models/dialog.model";
import { FacultyService } from "../../../core/http/admin/faculty.service";
import { DepartmentService } from "../../../core/http/admin/department.service";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  updtForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  departmentList: Array<DepartmentModel> = null;
  showPressed: boolean = false;
  openDepartment: DepartmentModel;

  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
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
          [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")],
          [],
        ],
        faculty: ["", [Validators.required], []],
      });
    } else {
      this.matForm = this.fb.group({
        faculty: ["", [Validators.required], []],
        department: ["", [Validators.required], []],
      });
      this.updtForm = this.fb.group({
        name: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")],
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

    if (option == "edit") {
      let dialogRef = this.openDialog("", true);
      this.facultyService.getFaculties().subscribe((response) => {
        dialogRef.close();
        this.facultyList = response;
      });
    }
  }

  addDepartment(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let department: DepartmentModel = new DepartmentModel();

    department.faculty = this.matForm.controls.faculty.value;
    department.name = this.matForm.controls.name.value;

    console.log(department);

    let dialogRef = this.openDialog("", true);
    this.service.addDepartment(department).subscribe((response) => {
      dialogRef.close();
      let department: DepartmentModel = response;
      console.log(department);
      if (department.seriesList == null) {
        this.openDialog(
          "Successfully created the new " +
            department.name +
            " department with id " +
            department.deptId +
            " from the faculty " +
            this.matForm.controls.faculty.value.name +
            ".",
          false
        );
      } else {
        this.openDialog(
          "Department " +
            department.name +
            " already exists with id " +
            department.deptId +
            " at faculty " +
            department.faculty.name +
            ".",
          false
        );
      }
    });
  }

  showDepartment(): void {
    this.showPressed = true;
    this.openDepartment = this.matForm.controls.department.value;
    this.updtForm.controls.name.setValue(this.openDepartment.name);
  }

  updateDepartment(): void {
    if (!this.updtForm.valid) {
      this.updtForm.markAsTouched();
      return;
    }

    let departmentModel: DepartmentModel = this.openDepartment;
    departmentModel.name = this.updtForm.controls.name.value;

    this.openConfirmDialog(
      "Are you sure you want to update this faculty?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.updateDepartment(departmentModel).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully updated this department", false);
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog("Successfully updated this department", false);
                } else if (err.error.text == "Department already exists") {
                  this.openDialog("Department already exists", false);
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

  deleteFaculty(): void {
    this.openConfirmDialog(
      "Are you sure you want to delete this department?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.deleteFaculty(this.openDepartment.deptId).subscribe(
            () => {
              dialogRef.close();
              dialogRef = this.openDialog(
                "Successfully deleted this department",
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
                    "Successfully deleted this department",
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
