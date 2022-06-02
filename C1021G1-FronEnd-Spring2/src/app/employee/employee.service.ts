import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from './model/employee';
import {Province} from './model/province';
import {District} from './model/district';
import {Ward} from './model/ward';

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
    return this.httpClient.post(this.employeeURL + '/create', employee, {headers: header});
  }

  updateEmployee(id: number, employee: Employee) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`};
    return this.httpClient.patch(this.employeeURL + '/update/' + id, employee,{headers: header})
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
