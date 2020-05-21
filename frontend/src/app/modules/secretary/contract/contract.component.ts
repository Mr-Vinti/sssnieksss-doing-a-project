import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FacultyModel } from "../../../shared/models/faculty.model";
import { FacultyService } from "../../../core/http/admin/faculty.service";
import { MatDialog } from "@angular/material/dialog";
import { Dialog } from "../../../shared/models/dialog.model";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { StudentModel } from "../../../shared/models/student.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ContractModel } from "../../../shared/models/contract.model";
import { ContractService } from "../../../core/http/secretary/contract.service";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["stdId", "name", "group", "username", "stdyYr"];
  contractsDisplayedColumns: string[] = ["ctrId", "stdyType", "stdyYr", "year"];
  matForm: FormGroup;
  contrForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  contractList: Array<ContractModel> = null;
  dataSource: MatTableDataSource<StudentModel>;
  contractsDataSource: MatTableDataSource<ContractModel>;
  selectedFaculty: boolean = false;
  selectedStudent: StudentModel = null;
  selectedContract: boolean = false;
  isNewContract: boolean = false;
  openContract: ContractModel = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private service: ContractService,
    private facultyService: FacultyService,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private initializePage(): void {
    this.matForm = this.fb.group({
      faculty: ["", [Validators.required], []],
    });
  }

  private initializeDatasource(): void {
    let dialogRef = this.openDialog("", true);
    this.dataSource = new MatTableDataSource();
    this.contractsDataSource = new MatTableDataSource();
    this.facultyService.getFaculties().subscribe((response) => {
      dialogRef.close();
      this.facultyList = response;
    });
  }

  ngOnInit(): void {
    this.initializePage();
    this.initializeDatasource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStudents() {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let studentList: Array<StudentModel> = new Array<StudentModel>();

    this.matForm.controls.faculty.value.departmentList.map((dept) => {
      dept.seriesList.map((series) => {
        series.groupList.map((group) => {
          group.studentList.map((stud) => {
            stud.group = group;
            studentList.push(stud);
          });
        });
      });
    });

    this.dataSource.data = studentList;
    this.selectedFaculty = true;
  }

  goToContracts(student: StudentModel) {
    this.selectedStudent = student;

    let dialogRef = this.openDialog("", true);
    this.service.getContracts(student.stdId).subscribe((response) => {
      dialogRef.close();
      this.contractList = response;
      if (this.contractList.length == 0) {
        this.openDialog("There is no contract for this student", false);
      }
      this.contractsDataSource.data = this.contractList;
    });
  }

  back() {
    this.selectedStudent = null;
  }

  add() {
    this.contrForm = this.fb.group({
      stdyType: ["", [Validators.required], []],
      stdyYr: ["", [Validators.required, Validators.pattern("^[1-9]*$")], []],
      year: ["", [Validators.required, Validators.pattern("^[0-9]*$")], []],
    });

    this.selectedContract = true;
    this.isNewContract = true;
  }

  addContract() {
    if (!this.contrForm.valid) {
      this.contrForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    let contractModel: ContractModel = new ContractModel();

    contractModel.stdyType = this.contrForm.controls.stdyType.value;
    contractModel.stdyYr = this.contrForm.controls.stdyYr.value;
    contractModel.year = this.contrForm.controls.year.value;
    contractModel.student = this.selectedStudent;
    contractModel.student.group = null;

    this.service.addContract(contractModel).subscribe((response) => {
      dialogRef.close();
      let contract: ContractModel = response;
      if (contract != null) {
        this.openDialog("Successfully created this contract", false)
          .afterClosed()
          .subscribe(() => {
            this.isNewContract = false;
            this.selectedContract = false;
          });
        this.contractList.push(contract);
      } else {
        this.openDialog("Contract creation failed", false)
          .afterClosed()
          .subscribe(() => {
            this.isNewContract = false;
            this.selectedContract = false;
          });
      }
    });
  }

  showContract(element: ContractModel) {
    this.contrForm = this.fb.group({
      ctrId: [{ value: element.ctrId, disabled: true }, [], []],
      stdyType: [element.stdyType, [Validators.required], []],
      stdyYr: [
        element.stdyYr,
        [Validators.required, Validators.pattern("^[1-9]*$")],
        [],
      ],
      year: [
        element.year,
        [Validators.required, Validators.pattern("^[0-9]*$")],
        [],
      ],
    });

    this.selectedContract = true;
    this.isNewContract = false;
    this.openContract = element;
  }

  updateContract() {
    if (!this.contrForm.valid) {
      this.contrForm.markAsTouched();
      return;
    }

    let contractModel: ContractModel = this.openContract;
    contractModel.stdyType = this.contrForm.controls.stdyType.value;
    contractModel.stdyYr = this.contrForm.controls.stdyYr.value;
    contractModel.year = this.contrForm.controls.year.value;
    contractModel.student = this.selectedStudent;
    contractModel.student.group = null;

    this.openConfirmDialog(
      "Are you sure you want to update this contract?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.updateContract(contractModel).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully updated this contract", false)
                .afterClosed()
                .subscribe(() => {
                  this.openContract = contractModel;
                  this.selectedContract = false;
                });
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog("Successfully updated this contract", false)
                    .afterClosed()
                    .subscribe(() => {
                      this.openContract = contractModel;
                      this.selectedContract = false;
                    });
                } else if (err.error.text.includes("Contract already exists")) {
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

  deleteContract(): void {
    this.openConfirmDialog(
      "Are you sure you want to delete this contract?",
      false,
      true
    )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm.event == "Yes") {
          let dialogRef = this.openDialog("", true);
          this.service.deleteContract(this.openContract.ctrId).subscribe(
            () => {
              dialogRef.close();
              dialogRef = this.openDialog(
                "Successfully deleted this contract",
                false
              );
              dialogRef.afterClosed().subscribe(() => {
                this.contractList = this.contractList.filter(
                  (item) => item.ctrId != this.openContract.ctrId
                );
                this.contractsDataSource.data = this.contractList;
                this.selectedContract = false;
              });
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  dialogRef = this.openDialog(
                    "Successfully deleted this contract",
                    false
                  );
                  dialogRef.afterClosed().subscribe(() => {
                    this.contractList = this.contractList.filter(
                      (item) => item.ctrId != this.openContract.ctrId
                    );
                    this.contractsDataSource.data = this.contractList;
                    this.selectedContract = false;
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
