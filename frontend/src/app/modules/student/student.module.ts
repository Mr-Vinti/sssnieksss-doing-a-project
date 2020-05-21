import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { StudentComponent } from "./student.component";
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
import { MatCardModule } from "@angular/material/card";
import { StudentRouting } from "./student.routing";
import { ModalDialogComponent } from "./modal-dialog/modal-dialog.component";
import { PersonalDataComponent } from "./personal-data/personal-data.component";
import { CertificatesComponent } from "./certificates/certificates.component";
import { CoursesComponent } from "./courses/courses.component";
import { ContractsComponent } from "./contracts/contracts.component";

@NgModule({
  declarations: [
    StudentComponent,
    PersonalDataComponent,
    CertificatesComponent,
    CoursesComponent,
    ContractsComponent,
    ModalDialogComponent,
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
    MatCardModule,
    StudentRouting,
  ],
  providers: [DatePipe],
  entryComponents: [ModalDialogComponent],
})
export class StudentModule {}
