import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarManegementRoutingModule } from './car-manegement-routing.module';
import { ManagementCarInComponent } from './management-car-in/management-car-in.component';
import { ManagementCarOutComponent } from './management-car-out/management-car-out.component';
import { SearchCarComponent } from './search-car/search-car.component';


@NgModule({
  declarations: [ManagementCarInComponent, ManagementCarOutComponent, SearchCarComponent],
  imports: [
    CommonModule,
    CarManegementRoutingModule
  ]
})
export class CarManegementModule { }
