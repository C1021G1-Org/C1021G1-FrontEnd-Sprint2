import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Car} from "./model/car";
import {TicketType} from "./model/ticketType";
import {Ticket} from "./model/ticket";
import {Floor} from "./model/floor";
import {ILocation} from './model/ilocation';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly URL_BE = 'http://localhost:8080/api/ticket'

  constructor(private httpClient: HttpClient) { }

  //LongLT
  findById(id: number) {
    return this.httpClient.get<Ticket>(this.URL_BE + '/edit/' + id)
  }
  updateTicket(id: number, data: Ticket) {
    return this.httpClient.patch<Ticket[]>(this.URL_BE + '/update/' + id, data)
  }
  getAllLocation() {
    return this.httpClient.get<ILocation[]>(this.URL_BE + '/location')
  }
  getAllCar() {
    return this.httpClient.get<Car[]>(this.URL_BE + '/car')
  }
  getAllTicketType() {
    return this.httpClient.get<TicketType[]>(this.URL_BE + '/ticketType')
  }
  getAllFloor() {
    return this.httpClient.get<Floor[]>(this.URL_BE + '/floor')
  }

//  LongLT
}
