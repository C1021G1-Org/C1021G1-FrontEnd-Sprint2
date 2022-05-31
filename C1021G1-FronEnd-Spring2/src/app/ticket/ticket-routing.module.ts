import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateTicketComponent} from './update-ticket/update-ticket.component';


const routes: Routes = [
  {path: 'update-ticket', component: UpdateTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
