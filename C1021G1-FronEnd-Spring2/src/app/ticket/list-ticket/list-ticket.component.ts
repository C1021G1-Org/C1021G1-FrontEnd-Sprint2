import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {Ticket} from "../model/ticket";
import {FormControl, FormGroup} from "@angular/forms";
import {Floor} from "../model/floor";
import {TicketType} from "../model/ticket-type";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DeleteTicketComponent} from "../delete-ticket/delete-ticket.component";
import {UpdateTicketComponent} from "../update-ticket/update-ticket.component";
import {UserRole} from "../dto/user-role";


@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  roleEmail: UserRole;
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

  constructor(private  ticketService: TicketService, private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.roleEmail = {role: sessionStorage.getItem('roles'), email: sessionStorage.getItem('email')}

    this.getListTicket();
    this.getListFloor();
    this.getListTypeTicket();
  }

  getListTicket() {
    if (this.searchForm.get('nameCustomer').value != '') {
      this.searchForm.patchValue({nameCustomer: this.searchForm.get('nameCustomer').value.trim()})
    }
    if (this.searchForm.get('phoneCustomer').value != '') {
      this.searchForm.patchValue({phoneCustomer: this.searchForm.get('phoneCustomer').value.trim()})

    }

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
    this.ticketService.getAllFloor().subscribe((data) => {
      this.listFloor = data;
    })
  }

  getListTypeTicket() {
    this.ticketService.getAllTicketType().subscribe((data) => {
      this.listTypeTicket = data;
    })
  }

  searchTicket() {
    this.page = 0
    this.getListTicket();
    console.log(this.searchForm.value)
  }

  gotoPage(num: number) {
    this.page = num
    if (this.page <= 0) {
      this.page = 0
    } else if (this.page > this.totalPages - 1) {
      this.page = this.totalPages - 1;
    }
    this.getListTicket();
  }

  indexPaginationChage(value: any) {
    this.page = value - 1;
    if (this.page <= 0) {
      this.page = 0
    } else if (this.page >= this.totalPages - 1) {
      this.page = this.totalPages - 1;
    }
    this.getListTicket();
  }

  openDeleteDialog(id: number) {

    if (this.roleEmail.role.includes('EMPLOYEE') || this.roleEmail.role.includes('ADMIN')) {
      this.ticketService.updateUserTicket(this.roleEmail, id).subscribe(data => {
        console.log(data)
        const x = this.dialog.open(DeleteTicketComponent, {
          width: '900px',
          height:'200px',
          data: {data1: id},
        })
        x.afterClosed().subscribe(() => {
          console.log("dong dailog")
          this.ngOnInit();
        })

      }, error => {
        console.log(error)
      })

    } else {
      this.snackBar.open('Bạn không đủ thẩm quyền để xóa vé', 'OK', {
        duration: 3000,

      })
    }

  }

  openUpdateDialog(id: number) {
    this.ticketService.idTicketUpDate = id
    this.router.navigateByUrl("/update-ticket")

  }

}
