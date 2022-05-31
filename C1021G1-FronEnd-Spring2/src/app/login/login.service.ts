import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInResult} from './model/sign-in-result';
import {ForgotPass} from './model/forgot-pass';
import {SignIn} from './model/sign-in';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  SIGN_IN_URL = 'http://localhost:8080/api/signIn';
  SIGN_UP_URL = "http://localhost:8080/api/SignUp";
  FORGET_PASSWORD_URL = "http://localhost:8080/api/forgetPassword";
  constructor(private httpClient: HttpClient) { }

  signIn(user:SignInResult){
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.httpClient.post<SignInResult>(this.SIGN_IN_URL,body,{headers: header});
  }

  changePs(formForgotPs: ForgotPass) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    const body = JSON.stringify(formForgotPs);
    console.log(body);
    return this.httpClient.post(this.FORGET_PASSWORD_URL,body,{headers:header});
  }

  rememberSignIn(user: SignIn) {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.httpClient.post<SignInResult>(this.SIGN_IN_URL,body,{headers: header});
  }
}
