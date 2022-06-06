
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {BodyComponent} from "./layout/body/body.component";
import {StatisticComponent} from "./statistic/statistic/statistic.component";
import {SearchCarComponent} from "./car-management/search-car/search-car.component";
import {CarManagementRoutingModule} from "./car-management/car-management-routing.module";
import {TicketRoutingModule} from "./ticket/ticket-routing.module";
import {LocationRoutingModule} from "./location/location-routing.module";
import {EmployeeRoutingModule} from "./employee/employee-routing.module";
import {CustomerRoutingModule} from "./customer/customer-routing.module";
import {MapParkingRoutingModule} from "./map-parking/map-parking-routing.module";

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
  {
    path: 'car', loadChildren: () => import('./car-management/car-management.module').then(mod => mod.CarManagementModule)

  },
  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },
  {
    path:'map-parking', loadChildren: ()=> import('./map-parking/map-parking.module').then(module => module.MapParkingModule)

  },
  {
    path: 'location', loadChildren: () => import('./location/location.module').then(module => module.LocationModule)
  }
  ,
  {path: 'statistic',component: StatisticComponent},
  {path:'home',component:BodyComponent},
  {
    path: 'findCar',
    component: SearchCarComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes), CarManagementRoutingModule, TicketRoutingModule, LocationRoutingModule, EmployeeRoutingModule, CustomerRoutingModule, MapParkingRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
