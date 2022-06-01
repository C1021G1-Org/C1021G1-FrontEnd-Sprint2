import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const API_TICKET = "http://localhost:8080/api/news/"
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient) { }


}
