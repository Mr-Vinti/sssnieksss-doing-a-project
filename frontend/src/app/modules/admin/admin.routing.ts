import { RouterModule, Routes } from "@angular/router";

//Components
import { FacultyComponent } from "./faculty/faculty.component";
import { SeriesComponent } from "./series/series.component";
import { DepartmentComponent } from "./department/department.component";
import { GroupComponent } from "./group/group.component";
import { StudentComponent } from "./student/student.component";
import { CourseComponent } from "./course/course.component";

//Routes
const moduleRoutes: Routes = [
  {
    path: "admin/faculty",
    component: FacultyComponent,
  },
  {
    path: "admin/department",
    component: DepartmentComponent,
  },
  {
    path: "admin/series",
    component: SeriesComponent,
  },
  {
    path: "admin/group",
    component: GroupComponent,
  },
  {
    path: "admin/student",
    component: StudentComponent,
  },
  {
    path: "admin/course",
    component: CourseComponent,
  },
];

export const AdminRouting = RouterModule.forRoot(moduleRoutes);
