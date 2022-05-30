import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {Ticket} from "../model/ticket";
import {FormControl, FormGroup} from "@angular/forms";
import {Floor} from "../model/floor";
import {TicketType} from "../model/ticket-type";


@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  ticketListFirst: Ticket[] = []
  page: number = 0;
  totalPages: number = 0
  totalElements: number = 0
  number: number = 0
  size: number = 0
  listFloor: Floor[] = []
  listTypeTicket: TicketType[] = []
  searchForm = new FormGroup({
    floor: new FormControl(''),
    ticketTypeName: new FormControl(''),
    endDate: new FormControl(''),
    nameCustomer: new FormControl(''),
    phoneCustomer: new FormControl('')
  })

  constructor(private  ticketService: TicketService) {
  }

  ngOnInit(): void {

    this.getListTicket();
    this.getListFloor();
    this.getListTypeTicket();
  }

  getListTicket() {
    this.ticketService.getListSearch(this.searchForm.value, this.page).subscribe((data) => {
      this.ticketListFirst = data.content
      for (let ticketObj of this.ticketListFirst) {
        ticketObj.flagExpire = this.isExpire(ticketObj.endDate);
      }
      console.log(this.ticketListFirst);
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
      this.size = data.size;
      this.number = data.number + 1;
    }, (error) => {
      console.log("có lỗi khi lấy list")
      console.log(error)
    })
  }

  isExpire(dateStr: string) {

    let today = new Date().toISOString().split('T')[0]
    let date = new Date(today).valueOf()
    let endDate = new Date(dateStr).valueOf();
    return ((date - endDate) > 0);
  }


  firstPage() {
    this.page = 0
    this.getListTicket();
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.page <= 0) {
      this.page = 0
    }
    this.getListTicket();
  }

  nextPage() {
    this.page = this.page + 1;
    if (this.page >= this.totalPages - 1) {
      this.page = this.totalPages - 1;
    }
    this.getListTicket()
  }

  lastPage() {
    this.page = this.totalPages - 1;
    this.getListTicket();
  }

  getListFloor() {
    this.ticketService.getListFloor().subscribe((data) => {
      this.listFloor = data;
    })
  }

  getListTypeTicket() {
    this.ticketService.getListTypeTicket().subscribe((data) => {
      this.listTypeTicket = data;
    })
  }

  searchTicket() {
    this.page = 0
    this.getListTicket();
    console.log(this.searchForm.value)
  }
}
