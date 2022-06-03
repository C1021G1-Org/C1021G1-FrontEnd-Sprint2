import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarManagementRoutingModule } from './car-management-routing.module';
import { ManagementCarInComponent } from './management-car-in/management-car-in.component';
import { ManagementCarOutComponent } from './management-car-out/management-car-out.component';
import { SearchCarComponent } from './search-car/search-car.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ManagementCarInComponent, ManagementCarOutComponent, SearchCarComponent],
    imports: [
        CommonModule,
        CarManagementRoutingModule,
        ReactiveFormsModule
    ]
})
export class CarManagementModule { }
