import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/customer";
import {CustomerService} from "../customer.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailCustomerComponent} from "../detail-customer/detail-customer.component";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customerList : Customer[];

  constructor(private customerService : CustomerService,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.customerService.getListCustomer(0).subscribe(data => {
      this.customerList = data.content;
    })
  }

  openDetailCustomer(id: number) {
    const dialogRef = this.dialog.open(DetailCustomerComponent, {
      //ThangDBX kích thước dialog
      width: '500px',
      data: {datal : id}
    })
    dialogRef.afterClosed().subscribe(next =>{
      this.ngOnInit();
    })
  }
}
