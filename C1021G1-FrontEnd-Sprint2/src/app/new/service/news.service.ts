import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INewsDto} from "../dto/i-news-dto";


const API_NEWS = "http://localhost:8080/api/news"
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAllNews(){
    return this.http.get<any>(`${API_NEWS}` + `/list`)
  }

  createNews(data){
    console.log("Đã về service create")
    return this.http.post<INewsDto>(`${API_NEWS}` + "/createNews", data)
  }

   findTicketById(id: number){
      return this.http.get<any>(`${API_NEWS}` + `/findNews/` + id)
   }

   editNews(id: number, data){
      return this.http.patch<any>(`${API_NEWS}` + `/updateNews/` + id, data)
   }
}
