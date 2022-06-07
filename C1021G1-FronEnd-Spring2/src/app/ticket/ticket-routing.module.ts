import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTicketComponent} from "./list-ticket/list-ticket.component";
import {UpdateTicketComponent} from "./update-ticket/update-ticket.component";



const routes: Routes = [
  {path:'list',component:ListTicketComponent},
  {path:'update-ticket', component: UpdateTicketComponent},

  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
