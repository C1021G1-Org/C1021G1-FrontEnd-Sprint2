import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { ListCarComponent } from './list-car/list-car.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { DeleteCarComponent } from './delete-car/delete-car.component';


@NgModule({
  declarations: [ListCarComponent, CreateCarComponent, DeleteCarComponent],
  imports: [
    CommonModule,
    CarRoutingModule
  ]
})
export class CarModule { }
