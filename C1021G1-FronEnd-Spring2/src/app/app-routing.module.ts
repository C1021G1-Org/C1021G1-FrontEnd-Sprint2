
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [

  {
    path: 'ticket', loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },


  {path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)},

  {
    path: 'employee', loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },

  {
    path:'location', loadChildren: ()=> import('./location/location.module').then(module => module.LocationModule)
  },
  {
    path:'map-parking', loadChildren: ()=> import('./map-parking/map-parking.module').then(module => module.MapParkingModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
