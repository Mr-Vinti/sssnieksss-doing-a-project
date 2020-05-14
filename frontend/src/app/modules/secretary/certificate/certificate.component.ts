import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CertificateModel } from "../../../shared/models/certificate.table";
import { StudentModel } from "../../../shared/models/student.model";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder } from "@angular/forms";
import { CertificateService } from "../../../core/http/secretary/certificate.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { Dialog } from "../../../shared/models/dialog.model";

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
  dataSource: MatTableDataSource<CertificateModel>;
  certificateList: Array<CertificateModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private service: CertificateService,
    public dialog: MatDialog,
  ) {}

  private openDialog(message: string, isLoading: boolean): any {
    return this.dialog.open(ModalDialogComponent, {
      width: "auto",
      data: new Dialog(message, isLoading),
      disableClose: true,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initializeDatasource(): void {
    let dialogRef = this.openDialog("", true);
    this.dataSource = new MatTableDataSource();
    this.service.getCertificates().subscribe((response) => {
      dialogRef.close();
      if (response.length) {
        this.openDialog("No certificates found", false);
      } else {
        this.certificateList = response;
        this.dataSource.data = this.certificateList;
      }
    })
  }

  ngOnInit() {
    this.initializeDatasource();
  }
}
