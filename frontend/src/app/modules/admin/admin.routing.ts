import { RouterModule, Routes } from "@angular/router";

//Components
import { FacultyComponent } from "./faculty/faculty.component";

//Routes
const moduleRoutes: Routes = [
  {
    path: "admin/faculty",
    component: FacultyComponent,
  },
];

export const AdminRouting = RouterModule.forRoot(moduleRoutes);
