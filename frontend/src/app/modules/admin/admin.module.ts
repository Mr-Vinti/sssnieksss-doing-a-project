import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FacultyComponent } from "./faculty/faculty.component";

import { AdminRouting } from "./admin.routing";
import { AdminComponent } from "./admin.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { ModalDialogComponent } from "./modal-dialog/modal-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [AdminComponent, FacultyComponent, ModalDialogComponent],
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
    AdminRouting,
  ],
  entryComponents: [ModalDialogComponent],
})
export class AdminModule {}
