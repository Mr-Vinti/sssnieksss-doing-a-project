import { RouterModule, Routes } from '@angular/router';

//Components
import { ComponentOneComponent } from './component-one/component-one.component';



//Routes
const moduleRoutes: Routes = [{
    path: 'module-one/component-one',
    component: ComponentOneComponent
}
]

export const ModuleOneRouting = RouterModule.forRoot(moduleRoutes);