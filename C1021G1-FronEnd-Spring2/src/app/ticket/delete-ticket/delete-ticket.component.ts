import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ticket} from "../model/ticket";

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements OnInit {
  idTicket: number = 0
  inForTicket: Ticket

  constructor(private  ticketService: TicketService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DeleteTicketComponent>,
              @Inject(MAT_DIALOG_DATA) public data1: any) {
  }

  ngOnInit(): void {
    this.idTicket = this.data1;
    this.getInForTicket();
    console.log(this.inForTicket)
  }

  getInForTicket() {
    this.ticketService.findById(this.idTicket).subscribe((data) => {
      this.inForTicket = data;
    })
  }

}
