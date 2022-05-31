import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private URL = 'http://localhost:8080/api';
  private API_CUSTOMER = 'http://localhost:8080/api/customer';

  constructor(private httpClient: HttpClient) {
  }

  getListProvince() {
    return this.httpClient.get(this.URL + "/province/province-list");
  }

  getListDistrict() {
    return this.httpClient.get(this.URL + "/district/district-list");
  }

  getListWard() {
    return this.httpClient.get(this.URL + "/ward/ward-list");
  }
  getListCustomer(page : any) : Observable<any>{
    console.log('da ket noi den BE')
    return  this.httpClient.get<any>( this.API_CUSTOMER + '/list?page=' + page);

  }

}


