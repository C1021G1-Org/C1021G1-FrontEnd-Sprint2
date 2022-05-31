import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCustomerComponent} from "./create-customer/create-customer.component";

import {ListCustomerComponent} from "./list-customer/list-customer.component";


const routes: Routes = [
  {path : 'list', component : ListCustomerComponent},
  {path: 'create', component: CreateCustomerComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
