import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ListCustomerComponent, UpdateCustomerComponent, DeleteCustomerComponent, CreateCustomerComponent, DetailCustomerComponent],

    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]

})
export class CustomerModule { }
