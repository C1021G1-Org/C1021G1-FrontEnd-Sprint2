import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapParkingRoutingModule } from './map-parking-routing.module';
import { MapListParkingComponent } from './map-list-parking/map-list-parking.component';
import { MapWarningComponent } from './map-warning/map-warning.component';
import { UpdateMapParkingComponent } from './update-map-parking/update-map-parking.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmMapParkingComponent } from './confirm-map-parking/confirm-map-parking.component';


@NgModule({
  declarations: [MapListParkingComponent, MapWarningComponent, UpdateMapParkingComponent, ConfirmMapParkingComponent],
  imports: [
    CommonModule,
    MapParkingRoutingModule,
    MatDialogModule
  ]
})
export class MapParkingModule { }
