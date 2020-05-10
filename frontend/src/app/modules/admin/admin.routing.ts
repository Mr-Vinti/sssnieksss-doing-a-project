import { RouterModule, Routes } from "@angular/router";

//Components
import { FacultyComponent } from "./faculty/faculty.component";
import { SeriesComponent } from "./series/series.component";
import { DepartmentComponent } from "./department/department.component";
import { GroupComponent } from "./group/group.component";

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
];

export const AdminRouting = RouterModule.forRoot(moduleRoutes);
