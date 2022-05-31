import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationDto} from './model/location-dto';
import {LocationList} from "./model/LocationList";
import {Floor} from "./model/floor";


@Injectable({
  providedIn: 'root'
})

export class LocationService {


  private readonly URL_BE = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {
  }
  findLocationById(id: number): Observable<Location>{
    return this.httpClient.get<Location>(this.URL_BE +'location/'+id,);
  }

  getDetailLocationById(id): Observable<LocationDto> {
    console.log(id);
    return this.httpClient.get<LocationDto>(this.URL_BE + 'location/detail/' + id,);
  }

  DeleteLocationById(id): Observable<LocationList> {
    console.log(id);
    return this.httpClient.delete<LocationList>(this.URL_BE + 'location/delete/' + id )

  //TinhHD lay list va tim kiem
  getAllLocationAndFloor(code: string, id: string, index: number) {
    return this.httpClient.get<LocationList[]>(this.URL_BE + "location/list?code=" + code + "&id=" + id + "&page=" + index)
  }
  //TinhHD lay list floor
  getAllFloor() {
    return this.httpClient.get<Floor[]>(this.URL_BE + "floor/list")
  }

}
