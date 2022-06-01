
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "./model/ticket";
import {DataPageable} from "./model/data-pageable";
import {SearchDto} from "./dto/search-dto";
import {Floor} from "./model/floor";
import {TicketType} from "./model/ticket-type";
import {ICar} from "./model/ICar";
import {ILocation} from './model/ilocation';
import {UserRole} from "./dto/user-role";


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  idTicketUpDate:number=0;
  private readonly URL_BE = 'http://localhost:8080/api/ticket'

  constructor(private httpClient: HttpClient) {
  }

// tam begin
  getListTicket(page:number){
    return this.httpClient.get<DataPageable>(`${this.URL_BE}/check?page=`+page)
  }

  getListSearch(searchDto:SearchDto,page:number){
    return this.httpClient.post<DataPageable>(`${this.URL_BE}/search?page=`+page ,searchDto)
  }

  updateUserTicket(updateUserEmailDto:UserRole,id:number){
    return this.httpClient.patch<any>(`${this.URL_BE}/updateUserEmail/`+id,updateUserEmailDto)
  }
  getTicketAction(updateUserEmailDto:UserRole,id:number){
    return this.httpClient.post<Ticket>(`${this.URL_BE}/getTicketAction/`+id,updateUserEmailDto)
  }

  deleteTicket(updateUserEmailDto:UserRole,id:number){
    return this.httpClient.patch(`${this.URL_BE}/delete/`+id,updateUserEmailDto)
  }
  // getSearchList(searchDto:SearchDto,page:number){
  //   return this.httpClient.get<DataPageable>(`${this.URL_BE}/search?page=`+page ,searchDto)
  // }
  // getListFloor(){
  //   return this.httpClient.get<Floor[]>(`${this.URL_BE}/getFloor`)
  // }

  // getListTypeTicket(){
  //   return this.httpClient.get<TicketType[]>(`${this.URL_BE}/ticketType`)
  // }

  //tam end




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
  getAllLocationByFloor(id:number){
    return this.httpClient.get<ILocation[]>(this.URL_BE + '/getByFloor/'+id)
  }
  getAllCar() {
    return this.httpClient.get<ICar[]>(this.URL_BE + '/car')
  }
  getAllTicketType() {
    return this.httpClient.get<TicketType[]>(this.URL_BE + '/ticketType')
  }
  getAllFloor() {
    return this.httpClient.get<Floor[]>(this.URL_BE + '/floor')
  }

//  LongLT

}
