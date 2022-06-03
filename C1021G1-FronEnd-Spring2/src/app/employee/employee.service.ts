import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from './model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeURL = 'http://localhost:8080/api/employee'

  constructor(private httpClient: HttpClient) { }

  createEmployee(employee: Employee) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    return this.httpClient.post(this.employeeURL + '/createEmployee', employee, {headers: header});
  }

  editEmployee(employee: Employee) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.post(this.employeeURL + "/editEmployee", employee,{headers: header})
  }

  getPosition() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Position[]>(this.employeeURL + '/list-position',{headers: header})
  }

  getDistrict() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Position[]>(this.employeeURL + '/district',{headers: header})
  }

  getProvince() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Position[]>(this.employeeURL + '/province',{headers: header})
  }

  getWard() {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.get<Position[]>(this.employeeURL + '/ward',{headers: header})
  }
}
