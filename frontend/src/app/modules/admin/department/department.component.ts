import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentModel } from '../../../shared/models/department.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Dialog } from '../../../shared/models/dialog.model';
import { FacultyService } from '../../../core/http/admin/faculty.service';
import { DepartmentService } from '../../../core/http/admin/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  optionPicked: boolean = false;
  option: string;
  matForm: FormGroup;
  departmentList: Array<DepartmentModel> = null;

  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
    public dialog: MatDialog
  ) {}

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
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
        department: [
          "",
          [Validators.required],
          [],
        ],
      })
    }
  }

  ngOnInit(): void {}

  selectOption(option: string): void {
    this.initializePage(option);
    this.optionPicked = true;
    this.option = option;

    if (option == "edit") {
      let dialogRef = this.openDialog("", true);
      this.service.getDepartments().subscribe((response) => {
        dialogRef.close();
        this.departmentList = response;
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
      .addDepartment(this.matForm.controls.name.value)
      .subscribe((response) => {
        dialogRef.close();
        let department: DepartmentModel = response;
        if (department.seriesList == null) {
          this.openDialog(
            "Successfully created the new " +
              department.name +
              " department with id " +
              department.deptId +
              " from the faculty " + 
              department.facId + 
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
              department.facId +
              ".",
            false
          );
        }
      });
  }

}
