import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';


@NgModule({
  declarations: [ListCustomerComponent, UpdateCustomerComponent, DeleteCustomerComponent, CreateCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
