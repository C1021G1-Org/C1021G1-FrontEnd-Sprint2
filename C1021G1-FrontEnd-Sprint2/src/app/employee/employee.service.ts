import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  API_LIST_EMPLOYEE = 'http://localhost:8080/api/employee/list';
  API_SEARCH_EMPLOYEE = 'http://localhost:8080/api/employee/search';
  API_DELETE_EMPLOYEE = 'http://localhost:8080/api/employee/delete/';
  API_BY_ID_EMPLOYEE = 'http://localhost:8080/api/employee/get/';

  constructor(private  httpClient: HttpClient) { }

  getAllEmployee(page : number): Observable<any>{
    return this.httpClient.get<any>(this.API_LIST_EMPLOYEE + '?page=' + page);
  }

  search(formBirthday: string, toBirthday: string, name: string, code: string,address: string,page:any) {
    console.log('Vào rồi')
    return this.httpClient.get(this.API_SEARCH_EMPLOYEE +'?fromBirthday=' + formBirthday + '&toBirthday=' + toBirthday + '&name=' + name +'&code=' +code +'&address=' + address + '&page=' + page);
  }

  findById(id: number) {
    return this.httpClient.get(this.API_BY_ID_EMPLOYEE + id);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(this.API_DELETE_EMPLOYEE + id);
  }






}
