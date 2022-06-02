import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationDto} from './model/location-dto';
import {LocationList} from './model/LocationList';
import {Floor} from './model/floor';


@Injectable({
  providedIn: 'root'
})

export class LocationService {


  private readonly URL_BE = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {
  }

  //dung chung
  findLocationById(id: number): Observable<Location> {
    return this.httpClient.get<Location>(this.URL_BE + 'location/' + id);
  }

//TrongTA hien thi thong tin chi tiet vi tri do xe
  getDetailLocationById(id): Observable<LocationDto> {
    return this.httpClient.get<LocationDto>(this.URL_BE + 'location/detail/' + id);
  }

//TrongTA xoa vi tri bai do xe
  DeleteLocationById(id): Observable<LocationList> {
    console.log(id);
    return this.httpClient.delete<LocationList>(this.URL_BE + 'location/delete/' + id);
  }

  //TinhHD lay list va tim kiem
  getAllLocationAndFloor(code: string, id: string, index: number) {
    return this.httpClient.get<LocationList[]>(this.URL_BE + 'location/list?code=' + code + '&id=' + id + '&page=' + index);
  }

  //TinhHD lay list floor
  getAllFloor() {
    return this.httpClient.get<Floor[]>(this.URL_BE + 'floor/list');
  }

}
