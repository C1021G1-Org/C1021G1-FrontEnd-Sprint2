import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapListParkingComponent} from './map-list-parking/map-list-parking.component';

import { MapListParkingComponent } from './map-list-parking/map-list-parking.component';






const routes: Routes = [
  {
    path:"listMap", component:MapListParkingComponent
  }
];

const routes: Routes = [
  {
    path:"listMap", component:MapListParkingComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapParkingRoutingModule { }
