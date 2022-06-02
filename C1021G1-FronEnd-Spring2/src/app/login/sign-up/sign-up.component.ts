import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';

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

  constructor(private router: Router,
              private loginService: LoginService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
      name: new FormControl(''),
      address: new FormControl(''),
      gender: new FormControl(''),
      birthday: new FormControl(''),
      phone: new FormControl(''),
      idCard: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      province: new FormControl(''),
      district: new FormControl(''),
      ward: new FormControl('')
    })
  }

  signUp() {
    if(this.signUpForm.invalid){
      this.checkForm = true;
    }else{
      this.checkForm = false;
      this.loginService.signUp(this.signUpForm.value).subscribe(data =>{
        this.openSnackBar('Đăng ký thành công','Đóng');
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

  openSnackBar(đăngKýThànhCông: string, đóng: string) {

  }

}
