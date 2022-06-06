import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerRoutingModule} from "./customer/customer-routing.module";
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SignInComponent} from './login/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path:'customer',loadChildren: () => import ('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {path:'home',component:BodyComponent}
]

import {BodyComponent} from "./layout/body/body.component";


@NgModule({
  imports: [RouterModule.forRoot(routes), CustomerRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
