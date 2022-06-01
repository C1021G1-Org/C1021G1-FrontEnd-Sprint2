import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarDtoCreate} from "./dto/car-dto-create";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private API_CAR = 'http://localhost:8080/api/car';

  constructor(private httpClient : HttpClient) { }

  //TrongHD thêm mới xe
  createCar(car) {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(car);
    return this.httpClient.post<CarDtoCreate>(this.API_CAR + '/create', body, {headers: header});
  }


}
