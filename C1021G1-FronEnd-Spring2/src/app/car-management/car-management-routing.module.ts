import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagementCarInComponent} from './management-car-in/management-car-in.component';
import {SearchCarComponent} from './search-car/search-car.component';


const routes: Routes = [
  {
    path: 'car', component: ManagementCarInComponent

  },
  {
  path: 'findCar',component: SearchCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarManagementRoutingModule { }
