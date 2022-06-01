import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ticket} from "../model/ticket";
import {UserRole} from "../dto/user-role";

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements OnInit {
  idTicket: number = 0
  inForTicket: Ticket
  roleEmail: UserRole;

  constructor(private  ticketService: TicketService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DeleteTicketComponent>,
              @Inject(MAT_DIALOG_DATA) public data1: any) {
  }

  ngOnInit(): void {
    this.roleEmail = {role: sessionStorage.getItem('roles'), email: sessionStorage.getItem('email')}
    console.log(this.data1)
    this.idTicket = this.data1.data1;
    this.getInForTicket()
  }

  getInForTicket() {
    this.ticketService.getTicketAction(this.roleEmail, this.idTicket).subscribe((data) => {
      this.inForTicket = data;
    },error => {
      console.log(error)
    })
  }

  gotoList() {
    this.dialogRef.close();
  }

  deleteTicket() {
    this.ticketService.deleteTicket(this.roleEmail, this.idTicket).subscribe(()=>{
      this.snackBar.open('đã xóa thành công', 'OK', {
        duration: 3000,

      })
      this.dialogRef.close();
    },(errors)=>{
      console.log(errors)
      this.snackBar.open(errors.error.messageEros, 'OK', {
        duration: 3000,

      })
    })
  }
}
