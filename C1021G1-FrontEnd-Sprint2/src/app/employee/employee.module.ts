import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';


@NgModule({
  declarations: [ListEmployeeComponent, UpdateEmployeeComponent, CreateEmployeeComponent, DeleteEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
