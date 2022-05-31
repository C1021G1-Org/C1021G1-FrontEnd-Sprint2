import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCustomerComponent} from "./create-customer/create-customer.component";


const routes: Routes = [
  {path: 'create', component: CreateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
