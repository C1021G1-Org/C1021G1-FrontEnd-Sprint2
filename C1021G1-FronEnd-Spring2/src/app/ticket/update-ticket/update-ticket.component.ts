import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ticket} from '../model/ticket';
import {TicketService} from '../ticket.service';
import {Customer} from '../model/customer';

import {TicketType} from '../model/ticketType';
import {Car} from '../model/car';
import {Floor} from '../model/floor';
import {ILocation} from '../model/ilocation';


@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {



  ticketTypes: TicketType[]=[];
  locations: ILocation[];
  ticket: Ticket;
  customer: Customer[];
  floors: Floor[];
  car: Car[];
  idTicket = 1;
  validation_message = {
    sumPrice: [
      {type: 'required', message: 'Vui lòng không để trống'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc chữ!'}
    ],
  };



  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.getAllCar();
    this.getTicketById();
    this.getAllTicketType();
    this.getAllLocation();
    this.getAllFloors();


  }

  ticketForm = new FormGroup({
    floor: new FormControl('',),
    location: new FormControl('',),
    sumPrice: new FormControl('',),
    ticketType: new FormControl('',),
    endDate: new FormControl('',)
  });
  getAllFloors() {
    this.ticketService.getAllFloor().subscribe(data => {
      this.floors = data;
    });
  }

  getTicketById() {

    this.ticketService.findById(this.idTicket).subscribe((data) => {
      this.ticket = data['content'];
      console.log(this.ticket);
    })
  }
    getAllTicketType() {
      this.ticketService.getAllTicketType().subscribe((listType) => {
        this.ticketTypes = listType;
      })
    }
    getAllLocation() {
      this.ticketService.getAllLocation().subscribe((listLocation) => {
        this.locations = listLocation;
      })
    }
    getAllCar() {
      this.ticketService.getAllCar().subscribe((listCar) => {
        this.car = listCar;
      })
    }



  update() {

  }
  checkCurrentDate(birthdayCurrent: AbstractControl) {
    // console.log(birthdayCurrent.value);
    // const birth = new Date(birthdayCurrent.value);
    // const births = Date.now() - birth.getTime() - 86400000;
    // const time = new Date(births);
    // console.log(time.getUTCFullYear());
    // const current = time.getUTCFullYear() - 1970;
    // console.log(current);
    // if (current <= 30) {
    //   return {'currentDate': true};
    // }
    // return null;
  }


}
