import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
<<<<<<< HEAD:C1021G1-FrontEnd-Sprint2/src/app/app-routing.module.ts
  {
    path: 'customer', loadChildren: () => import('./customer/customer.module').then(mod => mod.CustomerModule)
  }
=======
  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},
>>>>>>> 289d7c8d7273134530bc7bd6803bd60e4664563f:C1021G1-FronEnd-Spring2/src/app/app-routing.module.ts
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
