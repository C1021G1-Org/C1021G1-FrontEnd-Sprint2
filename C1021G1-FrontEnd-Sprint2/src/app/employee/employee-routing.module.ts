import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";


const routes: Routes = [
  {path: 'employee', component: ListEmployeeComponent},
  {path: 'employee/list', component: ListEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
