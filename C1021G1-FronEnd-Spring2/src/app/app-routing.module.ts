import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapListParkingComponent} from "./map-parking/map-list-parking/map-list-parking.component";


const routes: Routes = [
  {
    path:"map-parking", component:MapListParkingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
