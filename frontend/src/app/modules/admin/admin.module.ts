import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentOneComponent } from "./component-one/component-one.component";

import { AdminRouting } from "./admin.routing";
import { AdminComponent } from "./admin.component";

@NgModule({
  declarations: [AdminComponent, ComponentOneComponent],
  imports: [CommonModule, AdminRouting],
})
export class AdminModule {}
