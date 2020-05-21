import { RouterModule, Routes } from "@angular/router";
import { PersonalDataComponent } from "./personal-data/personal-data.component";
import { CertificatesComponent } from "./certificates/certificates.component";
import { CoursesComponent } from "./courses/courses.component";
import { ContractsComponent } from "./contracts/contracts.component";

//Routes
const moduleRoutes: Routes = [
  {
    path: "student/personal-data",
    component: PersonalDataComponent,
  },
  {
    path: "student/certificates",
    component: CertificatesComponent,
  },
  {
    path: "student/courses",
    component: CoursesComponent,
  },
  {
    path: "student/contracts",
    component: ContractsComponent,
  },
];

export const StudentRouting = RouterModule.forRoot(moduleRoutes);
