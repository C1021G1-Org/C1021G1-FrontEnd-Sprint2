import { Component, OnInit } from '@angular/core';
import {Ward} from "../model/ward";
import {District} from "../model/district";
import {Province} from "../model/province";
import {Customer} from "../model/customer";
import {CustomerService} from "../customer.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../car/model/car";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  wards : Ward[];
  districts : District[];
  provinces : Province[];
  id;
  car : Car[];

  constructor(private customerService : CustomerService,
              private router : Router,
              private snackBar : MatSnackBar,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.customerService.getListWard().subscribe(data => {
      this.wards = data;
      console.log(this.wards)
    })
    this.customerService.getListDistrict().subscribe( data => {
      this.districts = data;
      console.log(this.districts)
    })
    this.customerService.getListProvince().subscribe( data => {
      this.provinces = data;
      console.log(this.provinces)
    })


    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.id = data.get('id');
      this.customerService.getInfo(this.id).subscribe(value => {
        console.log(value['0']['customer'])
        this.car = value;
        this.editCustomerForm.patchValue(this.car[0].customer);
      })
    });


  }

  editCustomerForm = new FormGroup( {
    id : new FormControl(''),
    name : new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/),
      Validators.maxLength(40),
      Validators.minLength(5)]),
    birthday : new FormControl('', [Validators.required, this.checkAge]),
    idCard : new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{9})$|([0-9]{12})$/)]),
    email : new FormControl('',[Validators.required, Validators.email]),
    phone : new FormControl('', [Validators.required, Validators.pattern(/^((03)|(08)|(07)|(09))([0-9]){8}$/)]),
    gender : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    ward : new FormControl('', Validators.required)
  })


  updateCustomer() {
    if (!this.editCustomerForm.invalid) {
      this.customerService.updateCustomer(this.activatedRoute.snapshot.params.id, this.editCustomerForm.value).subscribe(() => {
        this.snackBar.open('Chỉnh sửa thông tin khách hàng thành công!', '', {
          duration: 2000
        });
      })
    }
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

}
