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

  //ThangDBX hien thi list danh sach
  getListCustomer(page : any) : Observable<any>{
    console.log('da ket noi den BE')
    return  this.httpClient.get<any>( this.API_CUSTOMER + '/list?page=' + page);
  }

  //ThangDBX xoa danh sach
  deleteCustomer(id : any) : Observable<any>{
    console.log("da gui id");
    return  this.httpClient.delete<any>(this.API_CUSTOMER + '/delete/' + id);
  }

  checkCustomerId(id : any) : Observable<any>{
    return this.httpClient.get<any>(this.API_CUSTOMER + '/find/' + id);
  }

  //ThangDBX tim kiem khach hang
  searchCustomer(startDate: string, endDate: string, code: string, phone: string, idCard: string, page): Observable<any>{
    console.log("da gui thong tin");
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    console.log("code: " + code);
    console.log("phone: " + phone);
    console.log("idcard: " + idCard);

    return this.httpClient.get<any>(this.API_CUSTOMER +'/search?startDate=' + startDate +'&endDate=' + endDate +'&code=' +code+ '&phone=' + phone + '&id_card=' + idCard + '&page='+ page)
  }

  getCardByIdCustomer(id:number){
    return this.httpClient.get<Car[]>(this.API_CUSTOMER + "/" + id);
  }

  getCustomerById(id:number){
    return this.httpClient.get<Customer>(this.API_CUSTOMER + "/detail/" + id);

  }

}


