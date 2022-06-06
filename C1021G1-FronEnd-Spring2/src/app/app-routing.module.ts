import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchCarComponent} from './car-management/search-car/search-car.component';
import {CarManagementRoutingModule} from './car-management/car-management-routing.module';
import {MapListParkingComponent} from './map-parking/map-list-parking/map-list-parking.component';
import {TicketRoutingModule} from './ticket/ticket-routing.module';
import {LocationRoutingModule} from './location/location-routing.module';
import {EmployeeRoutingModule} from './employee/employee-routing.module';
import { StatisticComponent } from './statistic/statistic/statistic.component';
const routes: Routes = [
  {
    path: 'car', loadChildren: () => import('./car-management/car-management.module').then(mod => mod.CarManagementModule)

  },
  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },
  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)

  },
  {
    path:'map-parking', loadChildren: ()=> import('./map-parking/map-parking.module').then(module => module.MapParkingModule)

  },
  {
    path: 'location', loadChildren: () => import('./location/location.module').then(module => module.LocationModule)
  }
  ,
  {path: 'statistic',component: StatisticComponent},
  {
    path: 'findCar',
    component: SearchCarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CarManagementRoutingModule, TicketRoutingModule, LocationRoutingModule, EmployeeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
