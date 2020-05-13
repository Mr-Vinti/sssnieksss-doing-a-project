import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretaryComponent } from './secretary.component';
import { ContractComponent } from './contract/contract.component';
import { CertificateComponent } from './certificate/certificate.component';
import { SecretaryRouting } from './secretary.routing';



@NgModule({
  declarations: [SecretaryComponent, ContractComponent, CertificateComponent],
  imports: [
    CommonModule,
    SecretaryRouting
  ]
})
export class SecretaryModule { }
