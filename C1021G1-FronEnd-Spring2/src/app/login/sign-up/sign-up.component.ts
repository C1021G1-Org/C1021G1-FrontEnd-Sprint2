import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Province} from '../../customer/model/province';
import {CustomerService} from '../../customer/customer.service';
import {District} from '../../customer/model/district';
import {Ward} from '../../customer/model/ward';
import {getLocaleDateFormat} from '@angular/common';
import {log} from 'util';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  checkForm: boolean;
  errorPhone: boolean;
  errorEmail: boolean;
  errorIdCard: boolean;
  listProvince: Province[];
  listDistrict: District[];
  listWard: Ward[];
  idProvince: number;
  idDistrict: any;
  passwordRegex = '([a-z]){0,}(?=.[0-9])([a-z]|[A-Z]|[0-9]).{0,}';
  phoneRegex = '([\+849|09])+[0-9]{8}';
  fullNameRegex = '[^0-9]{8,50}';
  idCardRegex = '[0-9]{12}';



  constructor(private router: Router,
              private loginService: LoginService,
              private _snackBar: MatSnackBar,
              private customerService:CustomerService) { }

  ngOnInit(): void {


    this.customerService.getListDistrict().subscribe(data => {
      this.listDistrict = data;
      console.log(this.listDistrict)
    })
    this.customerService.getListProvince().subscribe(data => {
      this.listProvince = data;
      console.log(this.listProvince)
    })
    console.log("ds "+ this.listDistrict);
    this.signUpForm = new FormGroup ({
      name: new FormControl('', [Validators.required,Validators.pattern(this.fullNameRegex)]),
      address: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      gender: new FormControl('', this.checkNull),
      birthday: new FormControl('', [Validators.required, this.checkAge]),
      phone: new FormControl('', Validators.compose([Validators.required,Validators.pattern(this.phoneRegex)])),
      idCard: new FormControl('', [Validators.required, Validators.pattern(this.idCardRegex)]),
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required,this.checkPass]),
      ward: new FormControl('')
    })
  }

  // getListProvince(){
  //   this.customerService.getListProvince().subscribe(value => {
  //     this.listProvince = value;
  //     console.log(this.listProvince);
  //   })
  // }
  // getListDistrictById(){
  //   this.customerService.getDistrict(this.idProvince).subscribe(data => {
  //     this.listDistrict = data;
  //     console.log(this.listDistrict);
  //   })
  // }

  getDistrictById(id: number) {
    this.customerService.getDistrict(id).subscribe(data => {
      this.listDistrict = data;
      console.log(this.listDistrict)
    })
  }

  getWardById(id: number) {
    this.customerService.getWard(id).subscribe(data => {
      this.listWard = data;
    })
  }

  getListWardById() {
    this.customerService.getListWard().subscribe(value => {
      this.listWard = value;
      console.log(this.listWard);
    })
  }

  openSnackBar() {
    this._snackBar.open("Đăng ký tài khoản mới thành công", "OK", {
      duration: 1000,
    });
  }

  signUp() {

    if(this.signUpForm.invalid){
      this.checkForm = true;
    }else{
      this.checkForm = false;
      console.log(this.signUpForm.value);
      this.loginService.signUp(this.signUpForm.value).subscribe(data =>{
        this.router.navigateByUrl('/home').then(r => {
        });
      },error => {
        console.log(error);
        if((typeof error.error) == 'string'){
          let er = error?.error;
          this.errorPhone = er.includes('phone')?true:false;
          this.errorEmail = er.includes('email')?true:false;
          this.errorIdCard = er.includes('idCard')?true:false;
        }else {
          this.errorEmail  =false;
          this.errorPhone = false;
          this.errorIdCard = false;
        }
      })
    }
  }

  // getIdProvince(idProvince: any) {
  //   let idP = idProvince.value;
  //   this.idProvince = idP;
  //   console.log("id :" + idP);
  //   this.getDistrictById();
  //   console.log("ds huyen :");
  // }

  // getIdDistrict(idDistrict: any) {
  //   let idD = idDistrict.value;
  //   this.idDistrict = idD;
  //   console.log("id :" + idD);
  //   this.getListWardById();
  //   console.log("ds huyen :");
  // }

  checkPass(psInput: AbstractControl): ValidationErrors{
    let check = true;
    let password = psInput.value;
    if(password.length<8&&password.length>0){
      return{
        'errorPs': true,
      }
    }

    for(let i = 0;i<password.length;i++){
      if(!isNaN(password[i])){
        console.log(password[i]);
        check = true;
        break;
      }
      check = false;
    }
    if(!check){
      return{
        'errorPs': true,
      }
    }
    for(let i = 0;i<password.length;i++){
      if((isNaN(password[i]))&&(password[i] == password[i].toUpperCase())){
        check = true;
        break;
      }
      check = false;
    }
    if(!check){
      return{
        'errorPs': true,
      }
    }

    for(let i = 0;i<password.length;i++){
      if((isNaN(password[i]))&&(password[i] == password[i].toLowerCase())){
        check = true;
        break;
      }
      check = false;
    }
    if(!check){
      return{
        'errorPs': true,
      }
    }
    return null;
  }

  checkAge(birthday: AbstractControl): ValidationErrors{
    let dayOfBirth = birthday.value;
    let birthdayToSeconds = new Date(dayOfBirth).getTime();
    let currentToSeconds = new Date().getTime();
    let between = currentToSeconds - birthdayToSeconds;
    let age = between/(60*60*24*1000*365);
    console.log(age<18|| age>150);
    if(age<18 || age>150){
      return {
        'errorAge': true
      }
    }
    return null;
  }

  checkNull(input : AbstractControl){
    if(input.value.toString()==''){
      console.log(input.value.toString());
      return {
        'inputNull': true
      }
    }
    return null;
  }


  readWard(value: any) {
    console.log(value);
    this.signUpForm.patchValue({ward:value})
  }
}
