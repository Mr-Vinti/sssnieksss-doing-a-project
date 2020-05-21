import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";
import { StudentService } from "../../../core/http/student/student.service";
import { Dialog } from "../../../shared/models/dialog.model";
import { MatDialog } from "@angular/material/dialog";
import { StudentModel } from "../../../shared/models/student.model";
import { MatTableDataSource } from "@angular/material/table";
import { CertificateModel } from "../../../shared/models/certificate.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DatePipe } from "@angular/common";
import { CertificateModalDialogComponent } from "../../secretary/certificate-modal-dialog/certificate-modal-dialog.component";

@Component({
  selector: "app-certificates",
  templateUrl: "./certificates.component.html",
  styleUrls: ["./certificates.component.scss"],
})
export class CertificatesComponent implements OnInit {
  displayedColumns: string[] = [
    "certId",
    "purpose",
    "status",
    "submittedAt",
    "approvedAt",
  ];
  matForm: FormGroup;
  dataSource: MatTableDataSource<CertificateModel>;
  certificateList: Array<CertificateModel> = null;
  request: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: StudentService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {}

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

  ngOnInit(): void {
    this.initializeDatasource();
  }

  requestForm() {
    this.matForm = this.fb.group({
      purpose: ["", [Validators.required], []],
    });

    this.request = true;
  }

  requestCert() {
    if (!this.matForm.valid) {
      this.matForm.markAsTouched();
      return;
    }

    let dialogRef = this.openDialog("", true);
    this.service
      .requestCertificate(this.matForm.controls.purpose.value)
      .subscribe((response) => {
        dialogRef.close();
        let cert: CertificateModel = response;
        if (cert != null) {
          this.openDialog("Successfully created this certificate", false)
            .afterClosed()
            .subscribe(() => {
              this.certificateList.push(cert);
              this.request = false;
            });
        } else {
          this.openDialog("Certificate request failed", false);
        }
      });
  }

  printCertificate(cert: CertificateModel) {}
}
