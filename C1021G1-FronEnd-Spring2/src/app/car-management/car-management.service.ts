import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarManagementService {

  constructor(
    private http: HttpClient
  ) { }
  private baseURL = 'http://localhost:8080/api/ticket';

  getListAll() {
    return this.http.get(this.baseURL + "/list" );
  }
}
