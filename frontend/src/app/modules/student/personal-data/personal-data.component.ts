import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { StudentService } from "../../../core/http/student/student.service";
import { Dialog } from "../../../shared/models/dialog.model";
import { MatDialog } from "@angular/material/dialog";
import { StudentModel } from "../../../shared/models/student.model";

@Component({
  selector: "app-personal-data",
  templateUrl: "./personal-data.component.html",
  styleUrls: ["./personal-data.component.scss"],
})
export class PersonalDataComponent implements OnInit {
  matForm: FormGroup = null;

  constructor(
    private service: StudentService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
      disableClose: true,
    });
  }

  private initializePage(stud: StudentModel): void {
    this.matForm = this.fb.group({
      faculty: [
        { value: stud.group.series.dept.faculty.name, disabled: true },
        [],
        [],
      ],
      dept: [{ value: stud.group.series.dept.name, disabled: true }, [], []],
      series: [{ value: stud.group.series.name, disabled: true }, [], []],
      group: [{ value: stud.group.name, disabled: true }, [], []],
      firstName: [{ value: stud.firstName, disabled: true }, [], []],
      lastName: [{ value: stud.lastName, disabled: true }, [], []],
      fthrInit: [{ value: stud.fatherInitial, disabled: true }, [], []],
      stdyYr: [{ value: stud.studyYear, disabled: true }, [], []],
      cnp: [{ value: stud.cnp, disabled: true }, [], []],
      phnNbr: [{ value: stud.phoneNumber, disabled: true }, [], []],
      userName: [{ value: stud.userName, disabled: true }, [], []],
      email: [{ value: stud.email, disabled: true }, [], []],
    });
  }

  private initializeDatasource(): void {
    let dialogRef = this.openDialog("", true);
    this.service.getPersonalData().subscribe((response) => {
      dialogRef.close();
      this.initializePage(response);
    });
  }

  ngOnInit(): void {
    this.initializeDatasource();
  }
}
