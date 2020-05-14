import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-certificate-modal-dialog",
  templateUrl: "./certificate-modal-dialog.component.html",
  styleUrls: ["./certificate-modal-dialog.component.scss"],
})
export class CertificateModalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CertificateModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClick(action: string) {
    this.dialogRef.close({ event: action });
  }
}
