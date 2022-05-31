import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationRoutingModule} from './location-routing.module';

import {CreateLocationComponent} from './create-location/create-location.component';
import {UpdateLocationComponent} from './update-location/update-location.component';
import {DeleteLocationComponent} from './delete-location/delete-location.component';
import {DetailLocationComponent} from './detail-location/detail-location.component';


@NgModule({
  declarations: [ CreateLocationComponent, UpdateLocationComponent, DeleteLocationComponent, DetailLocationComponent],
  exports: [

    DetailLocationComponent,
    DeleteLocationComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule
  ]
})
export class LocationModule {
}
