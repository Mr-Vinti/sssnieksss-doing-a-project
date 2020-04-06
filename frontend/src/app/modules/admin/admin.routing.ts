import { RouterModule, Routes } from "@angular/router";

//Components
import { ComponentOneComponent } from "./component-one/component-one.component";

//Routes
const moduleRoutes: Routes = [
  {
    path: "admin/component-one",
    component: ComponentOneComponent,
  },
];

export const AdminRouting = RouterModule.forRoot(moduleRoutes);
