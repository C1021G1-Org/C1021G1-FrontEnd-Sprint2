import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerRoutingModule} from "./customer/customer-routing.module";


const routes: Routes = [
  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path:'customer',loadChildren: () => import ('./customer/customer.module').then(module => module.CustomerModule)
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes), CustomerRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
