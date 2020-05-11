import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FacultyService } from "../../../core/http/admin/faculty.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { Dialog } from "../../../shared/models/dialog.model";
import { FacultyModel } from "../../../shared/models/faculty.model";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.scss"],
})
export class FacultyComponent implements OnInit {
  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  updtForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  showPressed: boolean = false;
  openFaculty: FacultyModel;

  constructor(
    private fb: FormBuilder,
    private service: FacultyService,
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
      });
    } else {
      this.matForm = this.fb.group({
        faculty: ["", [Validators.required], []],
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

  ngOnInit(): void {
    if (history.state.data !== undefined) {
      this.selectOption(history.state.data);
    }
  }

  selectOption(option: string): void {
    this.initializePage(option);
    this.optionPicked = true;
    this.option = option;

    if (option == "edit") {
      this.showPressed = false;
      let dialogRef = this.openDialog("", true);
      this.service.getFaculties().subscribe((response) => {
        dialogRef.close();
        this.facultyList = response;
      });
    }
  }

  addFaculty(): void {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    this.service
      .addFaculty(this.matForm.controls.name.value)
      .subscribe((response) => {
        dialogRef.close();
        let faculty: FacultyModel = response;
        if (faculty.departmentList == null) {
          this.openDialog(
            "Successfully created the new " +
              faculty.name +
              " faculty with id " +
              faculty.facId +
              ".",
            false
          );
        } else {
          this.openDialog(
            "Faculty " +
              faculty.name +
              " already exists with id " +
              faculty.facId +
              ".",
            false
          );
        }
      });
  }

  showFaculty(): void {
    this.showPressed = true;
    this.openFaculty = this.matForm.controls.faculty.value;
    this.updtForm.controls.name.setValue(this.openFaculty.name);
  }

  updateFaculty(): void {
    if (!this.updtForm.valid) {
      this.updtForm.markAsTouched();
      return;
    }

    let facultyModel: FacultyModel = this.openFaculty;
    facultyModel.name = this.updtForm.controls.name.value;

    this.openConfirmDialog(
      "Are you sure you want to update this faculty?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.updateFaculty(facultyModel).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully updated this faculty", false);
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog("Successfully updated this faculty", false);
                } else if (err.error.text == "Faculty already exists") {
                  this.openDialog("Faculty already exists", false);
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
      "Are you sure you want to delete this faculty?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.deleteFaculty(this.openFaculty.facId).subscribe(
            () => {
              dialogRef.close();
              dialogRef = this.openDialog(
                "Successfully deleted this faculty",
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
                    "Successfully deleted this faculty",
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
