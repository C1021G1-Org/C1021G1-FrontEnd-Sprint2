import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./model/customer";
import {CustomerDtoUpdate} from "./dto/customer-dto-update";
import {Ward} from "./model/ward";
import {District} from "./model/district";
import {Province} from "./model/province";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = 'http://localhost:8080/api/customer';
  private baseURLWard = 'http://localhost:8080/api/ward';
  private baseURLProvince = 'http://localhost:8080/api/province';
  private baseURLDistrict = 'http://localhost:8080/api/district';


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
    return this.http.patch<CustomerDtoUpdate>(this.baseURL + '/update/' + id, data,{headers: header});
  }

  //TrongHD lấy list ward
  getWard() {
    return this.http.get<Ward[]>(this.baseURL + '/ward-list')
  }

  //TrongHD lấy list district
  getDistrict() {
    return this.http.get<District[]>(this.baseURL + '/district-list')
  }

  //TrongHD lấy list province
  getProvince() {
    return this.http.get<Province[]>(this.baseURL + '/province-list')
  }

}
