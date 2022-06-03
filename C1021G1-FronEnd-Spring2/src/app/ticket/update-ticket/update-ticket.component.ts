import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ticket} from '../model/ticket';
import {TicketService} from '../ticket.service';
import {Customer} from '../model/customer';


import {ICar} from '../model/ICar';
import {Floor} from '../model/floor';
import {ILocation} from '../model/ILocation';
import {TicketType} from '../model/ticket-type';
import {Data, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserRole} from "../dto/user-role";


@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  roleEmail: UserRole;
  ticketTypes: TicketType[] = [];
  locations: ILocation[] = [];
  ticket: Ticket = null;
  customer: Customer[];
  floors: Floor[];
  car: ICar[];
  idTicket: number = 0;
  day: Date;
  validation_message = {
    sumPrice: [
      {type: 'required', message: 'Vui lòng không để trống'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc chữ!'}
    ],
  };


  constructor(private ticketService: TicketService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roleEmail = {role: sessionStorage.getItem('roles'), email: sessionStorage.getItem('email')}

    this.idTicket = this.ticketService.idTicketUpDate;
    console.log(this.idTicket);
    this.getListFloor();
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
    //
    //   this.inForTicket = data;
    // },error => {
    //   console.log(error)
    // })

    this.ticketService.getTicketAction(this.roleEmail, this.idTicket).subscribe((data) => {
      this.ticket = data;
      console.log(this.ticket);

      this.ticketForm.patchValue({floor: this.ticket.location.floor.id});
      this.ticketForm.patchValue({location: this.ticket.location.id});
      this.ticketForm.patchValue({ticketType: this.ticket.ticketType.id});
      this.ticketForm.patchValue({endDate: this.ticket.endDate});
      this.ticketForm.patchValue({sumPrice: this.ticket.sumPrice});
      this.ticketForm.patchValue({id: this.ticket.id});
      console.log(this.ticketForm.value);
      this.getListLocation();
    }, (errors) => {
      console.log(errors)
      this.snackBar.open(errors.error.messageEros, 'OK', {
        duration: 3000,

      })
      this.router.navigateByUrl('/ticket/list');
    }, () => {
      this.getListTicketType();
    });
  }

  getListFloor() {
    this.ticketService.getAllFloor().subscribe((data) => {
      this.floors = data;
      console.log(this.floors);
    });
  }


  getListLocation() {
    this.ticketService.getAllLocation().subscribe((data) => {
      this.locations = data;
    });
  }

  getListTicketType() {
    this.ticketService.getAllTicketType().subscribe((data) => {
      this.ticketTypes = data;
    });
  }

  update() {
    if (this.ticketForm) {
      this.ticketService.updateTicket(this.ticketForm.value).subscribe(() => {

        this.snackBar.open("Cập nhật thành công", 'OK', {
          duration: 2000
        })
        this.ticketService.updateNullUser(this.roleEmail, this.ticket.id).subscribe(data => {

        }, (errors) => {
          this.snackBar.open(errors.error.messageEros, 'OK', {
            duration: 3000,

          })
        })
        this.router.navigateByUrl('/ticket');
      }, (errors) => {
        console.log('coslooix khi upste');
        this.snackBar.open(errors.error.messageEros, 'OK', {
          duration: 3000,

        })

      }, () => {

      });
    }


  }

  readListLocation() {
    this.ticketService.getAllLocationByFloor(this.ticketForm.get('floor').value).subscribe((data) => {
      this.locations = data;
    });
  }

  changeDate() {
    console.log(this.ticketForm.get('ticketType').value);
    if (this.ticketTypes) {
      for (let item of this.ticketTypes) {
        if (this.ticketForm.get('ticketType').value == 1) {
          if (item.id == 1) {
            this.ticketForm.patchValue({sumPrice: (this.ticket.car.carType.price + item.price)});
            let plusDay = new Date().toISOString().split('T')[0];
            console.log(plusDay);
            this.day = new Date(plusDay);
            this.day.setDate(this.day.getDate() + 1);
            console.log(this.day);
            let current = new Date(this.day).toISOString().slice(0, 10);
            console.log(current);
            // let ydm = this.day.getFullYear() + "-" + this.day.getMonth() + "-" + this.day.getDay()
            this.ticketForm.patchValue({endDate: current});
            break;
          }
          // console.log(this.ticketForm.get('endDate'));
        } else if (this.ticketForm.get('ticketType').value == 2) {
          if (item.id == 2) {
            this.ticketForm.patchValue({sumPrice: (this.ticket.car.carType.price + item.price)});
            let plusMonth = new Date().toISOString().split('T')[0];
            console.log(plusMonth);
            this.day = new Date(plusMonth);
            this.day.setDate(this.day.getDate() + 30);
            console.log(this.day);
            let current = new Date(this.day).toISOString().slice(0, 10);
            console.log(current);
            // let ydm = this.day.getFullYear() + "-" + this.day.getMonth() + "-" + this.day.getDay()
            this.ticketForm.patchValue({endDate: current});
            // console.log(this.ticketForm.get('endDate'));
            break;
          }
        }
      }
    }

  }
}
