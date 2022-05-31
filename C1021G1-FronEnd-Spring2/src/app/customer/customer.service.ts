import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private URL = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) {
  }
  getListProvince() {
    return this.httpClient.get(this.URL + "/province/province-list");
  }
  getListDistrict(){
    return this.httpClient.get(this.URL + "/district/district-list");
  }
  getListWard(){
    return this.httpClient.get(this.URL + "/ward/ward-list");
  }
}
