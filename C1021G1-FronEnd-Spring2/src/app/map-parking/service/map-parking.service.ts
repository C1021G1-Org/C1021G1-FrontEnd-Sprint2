import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapParking} from '../model/map-parking';

@Injectable({
  providedIn: 'root'
})
export class MapParkingService {

  URL = "http://localhost:8080/"


  constructor(private http: HttpClient) {
  }

  getAllLocation(page: number): Observable<MapParking[]> {
    return this.http.get<MapParking[]>(this.URL + 'api/location/map-parking?page=' +page);
  }

  findLocationById(id: number): Observable<MapParking> {
    return this.http.get<MapParking>(this.URL + 'api/location/' + id);
  }

  updateColorLocation(id: number) {
    return this.http.delete(this.URL + 'api/location/update-map-parking/' + id);
  }

  searchLocation(value: string, page: number) {
    return this.http.get(this.URL + 'api/location/searchMap' + '?code=' + value + '&page=' + page);
  }
  getAllCar(email: string):Observable<any[]> {
    return this.http.get<any[]>(this.URL + 'api/location/carEmailCustomer?email=' + email);
  }
}
