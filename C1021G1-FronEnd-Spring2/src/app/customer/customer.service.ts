import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  API_CUSTOMER = 'http://localhost:8080/api/customer';


  constructor(private httpClient : HttpClient) { }

  getListCustomer(page : any) : Observable<any>{
    console.log('da ket noi den BE')
    return  this.httpClient.get<any>( this.API_CUSTOMER + '/list?page=' + page);
  }

  deleteCustomer(id : any){
    console.log("da gui id");
    this.httpClient.delete<any>(this.API_CUSTOMER + '/delete/' + id);
  }

  searchCustomer(startDate: string, endDate: string, code: string, phone: string, idCard: string, page): Observable<any>{
    console.log("da gui thong tin");
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    console.log("code: " + code);
    console.log("phone: " + phone);
    console.log("idcard: " + idCard);

    return this.httpClient.get<any>(this.API_CUSTOMER +'/search?startDate=' + startDate +'&endDate=' + endDate +'&code=' +code+ '&phone=' + phone + '&id_card=' + idCard)
  }
}
