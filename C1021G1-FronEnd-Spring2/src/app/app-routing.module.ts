import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapListParkingComponent} from "./map-parking/map-list-parking/map-list-parking.component";

const routes: Routes = [{
  path:'location', loadChildren: ()=> import('./location/location.module').then(module => module.LocationModule)
},
  {
    path:"map-parking", component:MapListParkingComponent
  }];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
