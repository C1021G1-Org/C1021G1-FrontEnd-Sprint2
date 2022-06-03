import {Component, Inject, OnInit} from '@angular/core';

import {CustomerService} from "../customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../car/model/car";
import {Customer} from "../model/customer";


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  carList: Car[];
  customer: Customer;
  constructor(private customerService: CustomerService,
              public dialogRef: MatDialogRef<DetailCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.customerService.getCardByIdCustomer(this.data).subscribe(data => {
        this.carList = data;
        console.log(data)
    });
    this.customerService.getCustomerById(this.data).subscribe(data => {
      this.customer = data;
    })
  }

  close() {
    this.dialogRef.close();
  }

}
