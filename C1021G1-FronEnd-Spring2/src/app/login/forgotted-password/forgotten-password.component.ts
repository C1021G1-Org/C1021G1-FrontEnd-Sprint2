import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  formForgotPs: FormGroup;
  checkPass: any;
  emailNotExist: boolean;
  checkPassword: boolean;

  constructor(private loginService: LoginService,
              public dialogRef: MatDialogRef<ForgottenPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public invalid: any,) { }

  ngOnInit(): void {
    this.formForgotPs = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',this.checkPass),
      confirmPassword: new FormControl('')
    })
  }

  Update() {
    if(this.formForgotPs.valid){
      this.loginService.changePs(this.formForgotPs.value).subscribe(data => {
        this.ngOnInit();
        this.emailNotExist = false;
        this.checkPassword = false;
        this.onNoClick()
      },error => {
        this.emailNotExist = true;
        this.checkPassword = true;
      })
    }else {
      this.emailNotExist = true;
      this.checkPassword = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkPsMatching() {
    let ps = this.formForgotPs.get('password').value;
    let confirmPs = this.formForgotPs.get('confirmPassword');
    if(ps !== confirmPs.value){
      confirmPs.setErrors({
        'mustMatching': true
      });
    }else {
      confirmPs.setErrors(null);
    }
  }
}
