import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const API_NEWS_TYPE = "http://localhost:8080/api/newsType"

@Injectable({
  providedIn: 'root'
})
export class NewsTypeService {

  constructor(private http: HttpClient) { }

  getAllNews(){
    return this.http.get<any>(`${API_NEWS_TYPE}` + `/newsType`)
  }

}
