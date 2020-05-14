import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { SecretaryComponent } from "./secretary.component";
import { ContractComponent } from "./contract/contract.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { SecretaryRouting } from "./secretary.routing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ModalDialogComponent } from "./modal-dialog/modal-dialog.component";
import { CertificateModalDialogComponent } from "./certificate-modal-dialog/certificate-modal-dialog.component";

@NgModule({
  declarations: [
    SecretaryComponent,
    ContractComponent,
    CertificateComponent,
    ModalDialogComponent,
    CertificateModalDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SecretaryRouting,
  ],
  providers: [DatePipe],
  entryComponents: [ModalDialogComponent, CertificateModalDialogComponent],
})
export class SecretaryModule {}
