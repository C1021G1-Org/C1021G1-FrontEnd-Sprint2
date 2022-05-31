import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "./model/ticket";
import {DataPageable} from "./model/data-pageable";
import {SearchDto} from "./dto/search-dto";
import {Floor} from "./model/floor";
import {TicketType} from "./model/ticket-type";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
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

  getListFloor(){
    return this.httpClient.get<Floor[]>(`${this.URL_BE}/getFloor`)
  }

  getListTypeTicket(){
    return this.httpClient.get<TicketType[]>(`${this.URL_BE}/getTypeTicket`)
  }
  getInForById(id:number){
    return this.httpClient.get<Ticket>(`${this.URL_BE}/edit/`+id)
  }
  //tam end


}
