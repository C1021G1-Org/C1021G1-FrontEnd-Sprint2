import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapParkingService {

  URL = "http://localhost:8080/"
  constructor(private http : HttpClient) { }

  getAllLocation():Observable<Location[]>{
    return this.http.get<Location[]>(this.URL + 'api/location/map-parking/');
  }

  findLocationById(id : number):Observable<Location>{
    return this.http.get<Location>(this.URL + 'api/location/map-parking/' + id);
  }

  updateColorLocation(id : number){
    return this.http.patch(this.URL + 'api/location/update-map-parking/'+id,null );
  }

}
