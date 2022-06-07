import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {INewsDto} from './dto/i-news-dto';
import {INews} from './model/i-news';

const API_NEW = "http://localhost:8080/api/news/"
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) { }

  getAllNews(){
    return this.http.get<any>(`${API_NEW}` + `/list`)
  }


  getAllNew(): Observable<any> {
    return this.http.get<any>(API_NEW + "list");
}


  createNews(data){
    console.log("Đã về service create")
    console.log(data)
    return this.http.post<INewsDto>(`${API_NEW}` + "/createNews", data)
  }


   findNewsById(id: number){
      return this.http.get<INews>(`${API_NEW}` + `/findNews/` + id)
   }

   editNews(id: number, data){
      return this.http.patch<any>(`${API_NEW}` + `/updateNews/` + id, data)
   }
}
