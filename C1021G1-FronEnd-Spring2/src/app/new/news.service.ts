import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_TICKET = "http://localhost:8080/api/news/"
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }

  getAllNew(): Observable<any> {
    let roles = sessionStorage.getItem('roles');
    return this.http.get<any>(API_TICKET + "list");
  }

}
