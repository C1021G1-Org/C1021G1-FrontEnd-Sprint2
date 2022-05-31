import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  creatCustomerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    code: new FormControl(''),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    phone: new FormControl(''),
    idWard: new FormControl(''),
    address: new FormControl(''),
    delFlag: new FormControl(''),

  })
  constructor() { }

  ngOnInit(): void {
  }

}
