import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ticket} from '../model/ticket';
import {TicketService} from '../ticket.service';
import {Customer} from '../model/customer';


import {ICar} from '../model/ICar';
import {Floor} from '../model/floor';
import {ILocation} from "../model/ILocation";
import {TicketType} from "../model/ticket-type";


@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {


  ticketTypes: TicketType[] = [];
  locations: ILocation[] = [];
  ticket: Ticket = null;
  customer: Customer[];
  floors: Floor[];
  car: ICar[];
  idTicket: number = 0;
  validation_message = {
    sumPrice: [
      {type: 'required', message: 'Vui lòng không để trống'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc chữ!'}
    ],
  };


  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.idTicket = this.ticketService.idTicketUpDate;
    console.log(this.idTicket)
    this.getListFloor()
    this.getInForTicket();

  }

  ticketForm = new FormGroup({
    id: new FormControl(''),
    floor: new FormControl('',),
    location: new FormControl('',),
    sumPrice: new FormControl('',),
    ticketType: new FormControl('',),
    endDate: new FormControl('',)
  });

  getInForTicket() {
    this.ticketService.findById(this.idTicket).subscribe((data) => {
      this.ticket = data;
      console.log(this.ticket)

      this.ticketForm.patchValue({floor: this.ticket.location.floor.id})
      this.ticketForm.patchValue({location: this.ticket.location.id})
      this.ticketForm.patchValue({ticketType: this.ticket.ticketType.id})
      this.ticketForm.patchValue({endDate: this.ticket.endDate})
      this.ticketForm.patchValue({sumPrice: this.ticket.sumPrice})
      this.ticketForm.patchValue({id: this.ticket.id})
      console.log(this.ticketForm.value)
      this.getListLocation();
    }, () => {
    }, () => {

      this.getListTicketType();
    })
  }

  getListFloor() {
    this.ticketService.getAllFloor().subscribe((data) => {
      this.floors = data;
      console.log(this.floors)
    })
  }


  getListLocation() {
    this.ticketService.getAllLocation().subscribe((data) => {
      this.locations = data
    })
  }

  getListTicketType() {
    this.ticketService.getAllTicketType().subscribe((data) => {
      this.ticketTypes = data;
    })
  }

  update() {

  }

  readListLocation() {
    this.ticketService.getAllLocationByFloor(this.ticketForm.get('floor').value).subscribe((data) => {
      this.locations = data
    })
  }
}
