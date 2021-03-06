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
import { MatSelectModule } from "@angular/material/select";
import { SeriesComponent } from "./series/series.component";
import { DepartmentComponent } from "./department/department.component";
import { GroupComponent } from "./group/group.component";
import { StudentComponent } from "./student/student.component";
import { CourseComponent } from "./course/course.component";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    AdminComponent,
    FacultyComponent,
    ModalDialogComponent,
    DepartmentComponent,
    SeriesComponent,
    GroupComponent,
    StudentComponent,
    CourseComponent,
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
    MatCardModule,
    AdminRouting,
  ],
  entryComponents: [ModalDialogComponent],
})
export class AdminModule {}
