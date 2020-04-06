import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestserviceService } from './http/testrest/testservice.service';
import { UserService } from './user.service';

//Services

//components


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [CommonModule],
  providers:[TestserviceService, UserService]
})
export class CoreModule { }