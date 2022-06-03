import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SearchCarComponent} from './car-management/search-car/search-car.component';


import {CarManagementRoutingModule} from './car-management/car-management-routing.module';

const routes: Routes = [
  {
    path: 'car', loadChildren: () => import('./car-management/car-management.module').then(mod => mod.CarManagementModule)
  },
  {
    path: 'findCar',
    component: SearchCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CarManagementRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
