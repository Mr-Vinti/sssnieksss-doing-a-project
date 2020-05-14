import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CertificateModel } from "../../../shared/models/certificate.model";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder } from "@angular/forms";
import { CertificateService } from "../../../core/http/secretary/certificate.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { Dialog } from "../../../shared/models/dialog.model";
import { DatePipe } from "@angular/common";
import {
  CertificateDialogModel,
  CertificateDialogModelWrapper,
} from "../../../shared/models/certificate-dialog.model";
import { CertificateModalDialogComponent } from "../certificate-modal-dialog/certificate-modal-dialog.component";
import { RouterLinkWithHref } from "@angular/router";

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
    "purpose",
    "status",
    "submittedAt",
    "approvedAt",
  ];
  dataSource: MatTableDataSource<CertificateModel>;
  certificateList: Array<CertificateModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: CertificateService,
    public dialog: MatDialog,
    public datepipe: DatePipe
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
      if (response.length == 0) {
        this.openDialog("No certificates found", false);
      } else {
        this.certificateList = response;
        this.dataSource.data = this.certificateList;
      }
    });
  }

  ngOnInit() {
    this.initializeDatasource();
  }

  private openConfirmDialog(
    model: CertificateDialogModel,
    isLoading: boolean,
    confirmNeeded: boolean
  ): any {
    return this.dialog.open(CertificateModalDialogComponent, {
      width: "auto",
      data: new CertificateDialogModelWrapper(
        model,
        isLoading,
        "",
        confirmNeeded
      ),
      disableClose: true,
    });
  }

  goToCertificate(cert: CertificateModel) {
    if (cert.status != 'PENDING') {
      return;
    }

    let model: CertificateDialogModel = new CertificateDialogModel();

    model.firstName = cert.student.firstName;
    model.lastName = cert.student.lastName;
    model.facultyName = cert.student.group.series.dept.faculty.name;
    model.departmentName = cert.student.group.series.dept.name;
    model.purpose = cert.purpose;
    model.stdyYr = cert.student.studyYear;

    this.openConfirmDialog(model, false, true)
      .afterClosed()
      .subscribe((confirm) => {
        let dialogRef = this.openDialog("", true);
        if (confirm.event == "Accept") {
          this.service.acceptCertificate(cert).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully accepted this certificate", false)
                .afterClosed()
                .subscribe(() => {
                  this.initializeDatasource();
                });
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog(
                    "Successfully accepted this certificate",
                    false
                  )
                    .afterClosed()
                    .subscribe(() => {
                      this.initializeDatasource();
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
        } else if (confirm.event == "Reject") {
          this.service.rejectCertificate(cert).subscribe(
            () => {
              dialogRef.close();
              this.openDialog("Successfully rejected this certificate", false)
                .afterClosed()
                .subscribe(() => {
                  this.initializeDatasource();
                });
            },
            (err) => {
              dialogRef.close();
              if (err.status == 200) {
                if (err.error.text == "Success") {
                  this.openDialog(
                    "Successfully rejected this certificate",
                    false
                  )
                    .afterClosed()
                    .subscribe(() => {
                      this.initializeDatasource();
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
        } else {
          dialogRef.close();
        }
      });
  }
}
