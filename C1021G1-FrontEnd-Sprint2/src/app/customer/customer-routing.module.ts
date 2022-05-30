import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";


const routes: Routes = [
  {
    path : 'update/:id', component: UpdateCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
