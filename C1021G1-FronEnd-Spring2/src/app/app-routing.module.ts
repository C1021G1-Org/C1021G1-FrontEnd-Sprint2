import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SignInComponent} from './login/sign-in/sign-in.component';


const routes: Routes = [

  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
