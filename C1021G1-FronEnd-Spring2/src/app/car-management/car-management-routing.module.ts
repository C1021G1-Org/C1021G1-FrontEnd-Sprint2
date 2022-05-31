import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagementCarInComponent} from './management-car-in/management-car-in.component';


const routes: Routes = [
  {
    path: 'car', component: ManagementCarInComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarManagementRoutingModule { }
