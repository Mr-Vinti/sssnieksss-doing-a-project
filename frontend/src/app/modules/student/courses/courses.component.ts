import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { StudentService } from "../../../core/http/student/student.service";
import { Dialog } from "../../../shared/models/dialog.model";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CourseModel } from "../../../shared/models/course.model";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "crsId",
    "name",
    "teacher",
    "creditPoints",
    "semester",
    "studyYear",
  ];
  dataSource: MatTableDataSource<CourseModel>;
  courseList: Array<CourseModel> = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StudentService, private dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
      disableClose: true,
    });
  }

  private initializeDatasource(): void {
    let dialogRef = this.openDialog("", true);
    this.dataSource = new MatTableDataSource();
    this.service.getCourses().subscribe((response) => {
      dialogRef.close();
      if (response.length == 0) {
        this.openDialog("No courses found", false);
      } else {
        this.courseList = response;
        this.dataSource.data = this.courseList;
      }
    });
  }

  ngOnInit(): void {
    this.initializeDatasource();
  }
}
