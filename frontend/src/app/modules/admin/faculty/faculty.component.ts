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

  private initializePage(): void {
    this.matForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")],
        [],
      ],
    });
  }

  ngOnInit(): void {
    this.initializePage();
  }

  selectOption(option: string): void {
    this.optionPicked = true;
    this.option = option;
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
}
