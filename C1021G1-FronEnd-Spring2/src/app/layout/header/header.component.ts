import { Component, OnInit } from '@angular/core';
import {SignInComponent} from '../../login/sign-in/sign-in.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SignIn} from '../../login/model/sign-in';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private email: string;
  private loginOk: boolean;

  constructor(private matDialog: MatDialog,
              private router: Router,
              private _snackBar: MatSnackBar,
              private serviceLogin: LoginService) { }

  ngOnInit(): void {
    this.rememberLogin();
  }

  openDialogSignIn() {
    const dialogRef = this.matDialog.open(SignInComponent,{
      width:"500px",
      data: {'invalid': 'false'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.email = sessionStorage.getItem('email');
      console.log(this.email.includes('@'));
      if(this.email.includes('admin@gmail.com')){
        this.loginOk = true
        this.openSnackBar('Đăng nhập thành công','đóng');
        this.router.navigateByUrl('/home').then(r => {
          console.log("suscess");
        });
      }else if(this.email.includes('employee@gmail.com')){
        this.loginOk = true;
        this.openSnackBar('Đăng nhập thành công','đóng');
        this.router.navigateByUrl('/home').then(r => {
          console.log("suscess");
        });
      }else if(this.email.includes('@gmail.com')){
        this.loginOk = true;
        this.openSnackBar('Đăng nhập thành công','đóng');
        this.router.navigateByUrl('/home').then(r => {
          console.log("suscess");
        });
      }{
        this.loginOk = false;
      }
    });
  }

  private rememberLogin() {
    let user: SignIn ={};
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('ps');
    if(email!=null && password!=null){
      user.email =email;
      user.password=password;
      this.serviceLogin.rememberSignIn(user);
    }
  }

  hiddenRoles(){
    sessionStorage.getItem("roles").includes("EMPLOYEE",0)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 1000,
    });
  }

}
