import { Component, OnInit } from '@angular/core';
import {Ward} from "../model/ward";
import {District} from "../model/district";
import {Province} from "../model/province";
import {Customer} from "../model/customer";
import {CustomerService} from "../customer.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

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
  customer : Customer;

  constructor(private customerService : CustomerService,
              private router : Router,
              private snackBar : MatSnackBar,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getWard();
    this.getDistrict();
    this.getProvince();
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.id = data.get('id');
      this.customerService.getInfo(this.id).subscribe(value => {
        console.log(value)
        this.customer = value;
        this.editCustomerForm.patchValue(this.customer);
      })
    });
  }

  editCustomerForm = new FormGroup( {
    id : new FormControl(''),
    name : new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/),
      Validators.maxLength(40),
      Validators.minLength(5)]),
    birthday : new FormControl('', [Validators.required, DateValidator]),
    idCard : new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{9})$|([0-9]{12})$/)]),
    email : new FormControl('',[Validators.required, Validators.email]),
    phone : new FormControl('', [Validators.required, Validators.pattern(/^((03)|(08)|(07)|(09))([0-9]){8}$/)]),
    gender : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    ward : new FormControl('', Validators.required)
  })

  getWard() {
    this.customerService.getWard().subscribe(data => {
      this.wards = data;
    })
  }

  getDistrict() {
    this.customerService.getDistrict().subscribe(data => {
      this.districts = data;
    })
  }

  getProvince() {
    this.customerService.getProvince().subscribe(data => {
      this.provinces = data;
    })
  }


}

export function DateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (new Date(control.value) > new Date()) {
    console.log(new Date(control.value))
    console.log(new Date())
    return {
      dateValid: true
    };
  }
  const dateOfBirth = new Date(control.value);
  if (new Date().getFullYear() - dateOfBirth.getFullYear() < 0.5 || new Date().getFullYear() - dateOfBirth.getFullYear() > 100) {
    return {
      checkAge: true
    };
  }
  return null;
}
