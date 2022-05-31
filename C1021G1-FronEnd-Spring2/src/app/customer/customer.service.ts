import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = 'http://localhost:8080/api/customer';


  constructor(private http : HttpClient) { }

  getInfo(id : number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.get<Customer>(this.baseURL + "/" + id,{headers: header})
  }

  //TrongHD sửa thông tin khách hàng
  updateCustomer(id: number, data) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.http.patch<Customer>(this.baseURL + '/update/' + id, data,{headers: header});
  }


}
