import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CertificateModel } from "../../../shared/models/certificate.table";
import { StudentModel } from "../../../shared/models/student.model";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

const ELEMENT_DATA: CertificateModel[] = [
  {
    certId: 1,
    student: new StudentModel(),
    motivation: "Locul de munca",
    status: true,
  },
  {
    certId: 2,
    student: new StudentModel(),
    motivation: "Internship",
    status: true,
  },
  {
    certId: 3,
    student: new StudentModel(),
    motivation: "Internship",
    status: false,
  },
];

/**
 * @title Table with filtering
 */
@Component({
  selector: "app-certificate",
  styleUrls: ["./certificate.component.scss"],
  templateUrl: "./certificate.component.html",
})
export class CertificateComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "certId",
    "name",
    "group",
    "motivation",
    "status",
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {}
}
