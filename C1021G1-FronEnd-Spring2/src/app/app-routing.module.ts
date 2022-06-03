
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SearchCarComponent} from './car-management/search-car/search-car.component';
import {CarManagementRoutingModule} from './car-management/car-management-routing.module';
import {MapListParkingComponent} from "./map-parking/map-list-parking/map-list-parking.component";

const routes: Routes = [
  {
    path: 'car', loadChildren: () => import('./car-management/car-management.module').then(mod => mod.CarManagementModule)
  }
  ,
  {
    path: 'findCar',
    component: SearchCarComponent
  }
  ,
  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)

  },


  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},

  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },

  {

  }
  ,
  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},
  {
    path:'location', loadChildren: ()=> import('./location/location.module').then(module => module.LocationModule)
  }
  ,
  {
    path:'map-parking', loadChildren: ()=> import('./map-parking/map-parking.module').then(module => module.MapParkingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CarManagementRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
