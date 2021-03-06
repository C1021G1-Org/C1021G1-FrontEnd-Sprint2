
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "./model/ticket";
import {DataPageable} from "./model/data-pageable";
import {SearchDto} from "./dto/search-dto";
import {Floor} from "./model/floor";
import {TicketType} from "./model/ticket-type";
import {ICar} from "./model/ICar";
import {UserRole} from "./dto/user-role";
import {TicketUpdateDto} from "./dto/ticket-update-dto";
import {ILocation} from "./model/ILocation";



@Injectable({
  providedIn: 'root'
})
export class TicketService {
  idTicketUpDate:number=0;
  private readonly URL_BE = 'http://localhost:8080/api/ticket'

  constructor(private httpClient: HttpClient) {
  }

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

  updateNullUser(updateUserEmailDto:UserRole,id:number){
    return this.httpClient.patch(`${this.URL_BE}/updateUserNull/`+id,updateUserEmailDto)
  }

  senPathFile(file:string){

    return this.httpClient.post(`${this.URL_BE}/check`,{"path":file})
  }

  findById(id: number) {
    return this.httpClient.get<Ticket>(this.URL_BE + '/edit/' + id)
  }
  updateTicket( data: TicketUpdateDto) {
    return this.httpClient.patch(this.URL_BE + '/update', data)
  }
  getAllLocation() {
    return this.httpClient.get<ILocation[]>(this.URL_BE + '/location')
  }
  getAllLocationByFloor(id:number,idLocation:number){
    return this.httpClient.get<ILocation[]>(this.URL_BE + '/getByFloor/'+id+'/'+idLocation)
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
}
