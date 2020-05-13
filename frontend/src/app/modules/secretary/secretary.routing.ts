import { RouterModule, Routes } from "@angular/router";

//Components
import { CertificateComponent } from "./certificate/certificate.component";
import { ContractComponent } from "./contract/contract.component";

//Routes
const moduleRoutes: Routes = [
  {
    path: "secretary/certificate",
    component: CertificateComponent,
  },
  {
    path: "secretary/contract",
    component: ContractComponent,
  },
];

export const SecretaryRouting = RouterModule.forRoot(moduleRoutes);
