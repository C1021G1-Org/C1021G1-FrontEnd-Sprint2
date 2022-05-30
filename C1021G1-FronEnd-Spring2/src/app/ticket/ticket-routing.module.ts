import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTicketComponent} from "./list-ticket/list-ticket.component";


const routes: Routes = [
  {path:'list',component:ListTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
