import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarTicket} from '../dto/CarTicket';
import {CarChoose} from '../dto/CarChoose';
import {PlateCar} from './model/plate-car';
import {EmptyLocation} from './model/emptyLocation';

@Injectable({
  providedIn: 'root'
})
export class CarManagementService {
private readonly URL = "http://localhost:8080/api/car";
  private readonly URL_BE = 'http://localhost:8080/api/ticket'
  private readonly URL_BE1 = 'http://localhost:8080/api/ticket/emptyLocation'
  currentTicket: CarChoose;
  plate: string ='';
  constructor(private httpClient: HttpClient ) { }


  findCar(customerName: string, phoneNumber: string,carPlate: string): Observable<CarTicket[]> {
    console.log(customerName);
    console.log(phoneNumber);
    console.log(carPlate);
    return this.httpClient.get<CarTicket[]>(this.URL + '/findModal?name=' + customerName  + '&phone=' + phoneNumber+ '&plate=' + carPlate)
  }
  chooseCar(carPlate: string ) : Observable<CarChoose[]>{
    console.log(carPlate);
    return this.httpClient.get<CarChoose[]>( this.URL + '/chooseCar?plate='+carPlate)
  }
  senPathFile(file:string){

    return this.httpClient.post<PlateCar>(`${this.URL_BE}/checkImage`,{"path":file})
  }

  getLocation(){
    return this.httpClient.get<EmptyLocation>(`${this.URL_BE1}`)
  }

  registerTicket(ticket) {
    console.log("dcdscdsc");
    console.log(ticket);
    return this.httpClient.post(this.URL_BE + '/create',ticket);
  }

  pay(value: any) {
    console.log("thanhtoan");
    return this.httpClient.post(this.URL_BE + '/updateTime',value);
  }
}



