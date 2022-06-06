import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';
import {MapListParkingComponent} from "./map-parking/map-list-parking/map-list-parking.component";
const routes: Routes = [

  {path: '',component: BodyComponent},
  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },

  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},{
    path:'location', loadChildren: ()=> import('./location/location.module').then(module => module.LocationModule)
  },
  {
    path:"map-parking", component:MapListParkingComponent
  }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
