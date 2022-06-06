import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_NEW = "http://localhost:8080/api/news/"
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }


  getAllNew(): Observable<any> {
    return this.http.get<any>(API_NEW + "list");
  }

}
