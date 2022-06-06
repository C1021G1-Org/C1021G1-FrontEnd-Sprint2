import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Statistic} from "./model/statistic";
import {Price} from "./model/price";
import { MinmaxYear } from './model/minmax-year';

@Injectable({
  providedIn: 'root'
})
export class StatisticServiceService {
  URL = "http://localhost:8080/api/statistic";
  constructor(private http: HttpClient) { }
  statistic(statistic: Statistic){
    const header = {
      'content-type': 'application/json'
    };
    console.log();
    return this.http.post<Price[]>(this.URL,statistic);
  }
  home(){
    return this.http.get("http://localhost:8080/home");
  }
  minmax(){
    return this.http.get<MinmaxYear>("http://localhost:8080/api/minMaxYear");
  }
}
