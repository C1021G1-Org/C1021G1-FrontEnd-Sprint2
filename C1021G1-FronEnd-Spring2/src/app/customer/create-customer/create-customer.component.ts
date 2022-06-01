import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateCarComponent} from "../../car/create-car/create-car.component";
import {DeleteCarComponent} from "../../car/delete-car/delete-car.component";
import {Ward} from "../model/ward";
import {District} from "../model/district";
import {Province} from "../model/province";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  wardList : Ward[];
  districts : District[];
  provinces : Province[];

  creatCustomerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    code: new FormControl(''),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    phone: new FormControl(''),
    ward: new FormControl(''),
    address: new FormControl(''),
    delFlag: new FormControl(''),

  })
  constructor(private customerService: CustomerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerService.getListWard().subscribe(data => {
      this.wardList = data;
      console.log(this.wardList)
    })
    this.customerService.getListDistrict().subscribe( data => {
      this.districts = data;
      console.log(this.districts)
    })
    this.customerService.getListProvince().subscribe( data => {
      this.provinces = data;
      console.log(this.provinces)
    })
  }

  openDialogAddCar() {
    const dialogRef = this.dialog.open(CreateCarComponent, {
      width: '500px',
    })
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    })
  }

  openDialogDeleteCar() {
    const dialogRef = this.dialog.open(DeleteCarComponent, {
      width: '500px',
    })
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    })
  }
  getDistrictById(id : number) {
    this.customerService.getDistrict(id).subscribe( data => {
      this.districts = data;
      console.log(this.districts)
    })
  }

  getWardById(id : number) {
    this.customerService.getWard(id).subscribe( data => {
      this.wardList = data;
    })
  }
}
