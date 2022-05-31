import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocationList} from "./model/LocationList";
import {Floor} from "./model/floor";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly URL_BE = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {

  }
  //TinhHD lay list va tim kiem
  getAllLocationAndFloor(code: string, id: string, index: number) {
    return this.httpClient.get<LocationList[]>(this.URL_BE + "location/list?code=" + code + "&id=" + id + "&page=" + index)
  }
  //TinhHD lay list floor
  getAllFloor() {
    return this.httpClient.get<Floor[]>(this.URL_BE + "floor/list")
  }
}
