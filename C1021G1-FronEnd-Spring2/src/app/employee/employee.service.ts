import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from './model/employee';
import {Province} from './model/province';
import {District} from './model/district';
import {Ward} from './model/ward';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeURL = 'http://localhost:8080/api/employee'
  API_LIST_EMPLOYEE = 'http://localhost:8080/api/employee/list';
  API_SEARCH_EMPLOYEE = 'http://localhost:8080/api/employee/search';
  API_DELETE_EMPLOYEE = 'http://localhost:8080/api/employee/delete/';
  API_BY_ID_EMPLOYEE = 'http://localhost:8080/api/employee/get/';

  constructor(private httpClient: HttpClient) { }


  getAllEmployee(page : number): Observable<any>{
    return this.httpClient.get<any>(this.API_LIST_EMPLOYEE + '?page=' + page);
  }

  search(formBirthday: string, toBirthday: string, name: string, code: string,address: string,page:any) {
    console.log('Vào rồi')
    return this.httpClient.get(this.API_SEARCH_EMPLOYEE +'?fromBirthday=' + formBirthday + '&toBirthday=' + toBirthday + '&name=' + name +'&code=' +code +'&address=' + address + '&page=' + page);
  }

  findByIdL(id: number) {
    return this.httpClient.get(this.API_BY_ID_EMPLOYEE + id);
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(this.API_DELETE_EMPLOYEE + id);
  }
  createEmployee(employee: Employee) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.httpClient.post(this.employeeURL + '/create', employee, {headers: header});
  }

  updateEmployee(employee: Employee) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.post(this.employeeURL + employee,{headers: header})
  }

  findById(id: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get(this.employeeURL + '/' + id,{headers: header});
  }

  getPosition() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Position[]>(this.employeeURL + '/list-position',{headers: header})
  }

  getDistrict(id: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<District[]>(this.employeeURL + '/district-list/' + id,{headers: header})
  }

  getProvince() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Province[]>(this.employeeURL + '/province-list',{headers: header})
  }

  getWard(id: number) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Ward[]>(this.employeeURL + '/ward-list/' + id,{headers: header})
  }
}
