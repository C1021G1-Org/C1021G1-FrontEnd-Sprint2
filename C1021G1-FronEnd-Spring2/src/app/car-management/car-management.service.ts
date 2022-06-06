import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarTicket} from '../dto/CarTicket';
import {CarChoose} from '../dto/CarChoose';

@Injectable({
  providedIn: 'root'
})
export class CarManagementService {
  private readonly URL = "http://localhost:8080/api/car";
  currentTicket: CarChoose;

  constructor(private httpClient: HttpClient) {
  }
  findCar(customerName: string, phoneNumber: string, carPlate: string): Observable<CarTicket[]> {
    console.log(customerName);
    console.log(phoneNumber);
    console.log(carPlate);
    return this.httpClient.get<CarTicket[]>(this.URL + '/findModal?name=' + customerName + '&phone=' + phoneNumber + '&plate=' + carPlate)
  }

  chooseCar(carPlate: string): Observable<CarChoose[]> {
    return this.httpClient.get<CarChoose[]>(this.URL + '/chooseCar?plate=' + carPlate)
  }
}




