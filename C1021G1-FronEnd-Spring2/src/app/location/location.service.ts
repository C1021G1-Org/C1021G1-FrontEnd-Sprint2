import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationDto} from './model/location-dto';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private readonly URL_BE = 'http://localhost:8080/api/location';

  constructor(private httpClient: HttpClient) {
  }
  findLocationById(id: number): Observable<Location>{
    return this.httpClient.get<Location>(this.URL_BE +'/'+id,);
  }

  getDetailLocationById(id): Observable<LocationDto> {
    console.log(id);
    return this.httpClient.get<LocationDto>(this.URL_BE + '/detail/' + id,);
  }

  // DeleteLocationById(id): Observable<LocationList> {
  //   console.log(id);
  //   return this.httpClient.delete<LocationList>(this.URL_BE + '/delete/' + id,{headers: this.header} )
  // }
}
