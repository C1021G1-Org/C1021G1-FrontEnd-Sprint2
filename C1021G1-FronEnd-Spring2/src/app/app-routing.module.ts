
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SignInComponent} from './login/sign-in/sign-in.component';

import {MapListParkingComponent} from "./map-parking/map-list-parking/map-list-parking.component";
const routes: Routes = [

  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },

  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},{
    path:'location', loadChildren: ()=> import('./location/location.module').then(module => module.LocationModule)
  },
  {
    path:"map-parking", component:MapListParkingComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
