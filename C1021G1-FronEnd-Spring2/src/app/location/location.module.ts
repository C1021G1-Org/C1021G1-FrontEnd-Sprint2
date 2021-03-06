import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationRoutingModule} from './location-routing.module';
import {CreateLocationComponent} from './create-location/create-location.component';
import {UpdateLocationComponent} from './update-location/update-location.component';
import {DeleteLocationComponent} from './delete-location/delete-location.component';
import {DetailLocationComponent} from './detail-location/detail-location.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {ListLocationComponent} from './list-location/list-location.component';
import {MatDialogRef} from '@angular/material/dialog';
  @NgModule({
    declarations: [
      ListLocationComponent,
      CreateLocationComponent,
      UpdateLocationComponent,
      DeleteLocationComponent,
      DetailLocationComponent],
    exports: [
      ListLocationComponent,
      DetailLocationComponent,
      DeleteLocationComponent
    ],
    imports: [
      CommonModule,
      LocationRoutingModule,
      MatSnackBarModule,
      ReactiveFormsModule
    ]
  })
  export class LocationModule {
  }
