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
import { DepartmentModel } from "../../../shared/models/department.model";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["stdId", "name", "group", "username", "stdyYr"];
  matForm: FormGroup;
  facultyList: Array<FacultyModel> = null;
  dataSource: MatTableDataSource<StudentModel>;
  selectedFaculty: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
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
}
