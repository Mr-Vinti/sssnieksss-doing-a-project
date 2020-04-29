import { RouterModule, Routes } from "@angular/router";

//Components
import { FacultyComponent } from "./faculty/faculty.component";
import { SeriesComponent } from "./series/series.component";

//Routes
const moduleRoutes: Routes = [
  {
    path: "admin/faculty",
    component: FacultyComponent,
  },

  {
    path: "admin/series",
    component: SeriesComponent,
  },
];

export const AdminRouting = RouterModule.forRoot(moduleRoutes);
