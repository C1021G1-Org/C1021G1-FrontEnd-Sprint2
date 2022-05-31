import {Injectable, Optional} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Province} from "./model/province";
import {District} from "./model/district";
import {Ward} from "./model/ward";
import {Customer} from "./model/customer";
import {Car} from "../car/model/car";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private URL = 'http://localhost:8080/api';
  private API_CUSTOMER = 'http://localhost:8080/api/customer';

  constructor(private httpClient: HttpClient) {
  }

  getListProvince() {
    return this.httpClient.get<Province[]>(this.URL + "/province/province-list");
  }

  getListDistrict() {
    return this.httpClient.get<District[]>(this.URL + "/district/district-list");
  }

  getListWard() {
    return this.httpClient.get<Ward[]>(this.URL + "/ward/ward-list");
  }
  getListCustomer(page : any) : Observable<any>{
    console.log('da ket noi den BE')
    return  this.httpClient.get<any>( this.API_CUSTOMER + '/list?page=' + page);

  }
  getCardByIdCustomer(id:number){
    return this.httpClient.get<Car[]>(this.API_CUSTOMER + "/" + id);
  }
  getCustomerById(id:number){
    return this.httpClient.get<Customer>(this.API_CUSTOMER + "/detail/" + id);
  }
}


