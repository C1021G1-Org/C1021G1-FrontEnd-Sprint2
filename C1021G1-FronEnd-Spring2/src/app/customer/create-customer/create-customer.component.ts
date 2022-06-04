import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateCarComponent} from "../../car/create-car/create-car.component";
import {DeleteCarComponent} from "../../car/delete-car/delete-car.component";
import {Ward} from "../model/ward";
import {District} from "../model/district";
import {Province} from "../model/province";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Car} from "../../car/model/car";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  wardList: Ward[];
  districts: District[];
  provinces: Province[];
  carList: Car[];

  creatCustomerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,
      Validators.pattern(/^([a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*){6,40}$/),
      Validators.maxLength(40),
      Validators.minLength(5)]),
    gender: new FormControl('', Validators.required),
    idCard: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{9,12})$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required, this.checkAge]),
    phone: new FormControl('', [Validators.required,
      Validators.pattern("^(0[3|7|8|5|9])+([0-9]{8,9})$")]),
    ward: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40)]),

  })

  constructor(private customerService: CustomerService,
              public dialog: MatDialog,
              private snackbar : MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerService.getListWard().subscribe(data => {
      this.wardList = data;
      console.log(this.wardList)
    })
    this.customerService.getListDistrict().subscribe(data => {
      this.districts = data;
      console.log(this.districts)
    })
    this.customerService.getListProvince().subscribe(data => {
      this.provinces = data;
      console.log(this.provinces)
    })
    this.customerService.getCarByIdCustomerNull().subscribe(data =>{
      this.carList = data;
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

  getDistrictById(id: number) {
    this.customerService.getDistrict(id).subscribe(data => {
      this.districts = data;
      console.log(this.districts)
    })
  }

  getWardById(id: number) {
    this.customerService.getWard(id).subscribe(data => {
      this.wardList = data;
    })
  }

  checkAge(birthday: AbstractControl) {
    const birth = new Date(birthday.value);
    const date = Date.now() - birth.getTime() - 86400000;
    const time = new Date(date);
    const age = time.getUTCFullYear() - 1970;
    if (age < 18) {
      return {'ageUnder': true};
    }
    return null;
  }

  createCustomer() {
    this.customerService.createCustomer(this.creatCustomerForm.value).subscribe(()=>{
      this.router.navigateByUrl("/customer/list");
      this.snackbar.open("Thêm mới khách hàng thành công","Đóng",{
        duration: 2000
      })
    })
    console.log(this.creatCustomerForm.value);
  }
}
