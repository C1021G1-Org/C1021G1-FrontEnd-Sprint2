import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocationList} from "./model/LocationList";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly URL_BE = 'http://localhost:8080/api/location';

  constructor(private httpClient: HttpClient) {

  }

  getAllLocationAndFloor(code: string, id: string, index: number) {
    return this.httpClient.get<LocationList[]>(this.URL_BE + "/list?code=" + code + "&id=" + id + "&page=" + index)
  }
}
