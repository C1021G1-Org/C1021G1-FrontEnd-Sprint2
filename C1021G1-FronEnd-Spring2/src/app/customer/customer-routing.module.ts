import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";

import {ListCustomerComponent} from "./list-customer/list-customer.component";

import {CreateCustomerComponent} from "./create-customer/create-customer.component";

const routes: Routes = [
  {
    path : 'update/:id', component: UpdateCustomerComponent
  },
  {
    path : 'list', component : ListCustomerComponent
  },
  {
    path: 'create', component: CreateCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
