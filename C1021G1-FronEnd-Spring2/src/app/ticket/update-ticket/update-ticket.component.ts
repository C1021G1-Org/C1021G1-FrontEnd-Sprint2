import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ticket} from "../model/ticket";
import {TicketService} from "../ticket.service";
import {Customer} from "../model/customer";
import {CarType} from "../model/carType";
import {TicketType} from "../model/ticketType";
import {Car} from "../model/car";
import {Floor} from "../model/floor";

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  ticketForm: FormGroup;
  ticketType: TicketType[];
  locations: Location[];
  ticket: Ticket;
  customer: Customer[];
  floors: Floor[];
  car: Car[];
  idTicket=1
  validation_message = {
    floor: [
      {type: 'required', message: 'Vui lòng không để trống'},
      {type: 'required', message: 'Vui lòng không để trống'},
    ],
    location: [
      {type: 'required', message: 'Vui lòng không để trống'},
    ],
    sumPrice: [
      {type: 'required', message: 'Vui lòng không để trống'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc chữ!'}
    ],
    endDate: [
      {type: 'required', message: 'Vui lòng không để trống'},
      {type: 'currentDate', message: 'Thời gian không chính xác'}
    ]
  }




  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getTicketById(this.idTicket);
    this.ticketForm = new FormGroup({
      floor : new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      sumPrice: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/)]),
      ticketType: new FormControl('', Validators.required),
      endDate: new FormControl('', [Validators.required, this.checkCurrentDate])
    });
    this.ticketService.getAllLocation().subscribe((data: Location[]) => {
      this.locations = data;
      this.ticketService.getAllTicketType().subscribe((data: TicketType[])=> {
        this.ticketType = data;
        this.ticketService.getAllCar().subscribe((data: Car[]) => {
          this.car = data;
          this.ticketService.getAllFloor().subscribe(data => {
            this.floors = data;
          })
        })
      })
    })
  }

  checkCurrentDate(birthdayCurrent: AbstractControl) {
    console.log(birthdayCurrent.value);
    const birth = new Date(birthdayCurrent.value);
    const births = Date.now() - birth.getTime() - 86400000;
    const time = new Date(births);
    console.log(time.getUTCFullYear());
    const current = time.getUTCFullYear() - 1970;
    console.log(current);
    if (current <= 30) {
      return {'currentDate': true};
    }
    return null;
  }
  getAllFloors() {
    this.ticketService.getAllFloor().subscribe(data => {
      this.floors = data;
    })
  }
  getTicketById(id: number) {
    this.ticketService.findById(id).subscribe((data) => {
      this.ticket = data;
    })
  }
  update() {

  }



}
