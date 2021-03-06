import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { DeleteTicketComponent } from './delete-ticket/delete-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";




@NgModule({
  declarations: [ListTicketComponent, CreateTicketComponent, DeleteTicketComponent, UpdateTicketComponent],

    exports: [
        UpdateTicketComponent,
        ListTicketComponent
    ],
    imports: [
        CommonModule,
        TicketRoutingModule,
        ReactiveFormsModule,
        MatDialogModule
    ]

})
export class TicketModule { }
