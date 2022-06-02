import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../new/news.service";
declare var WOW;
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.wow();
  }
  wow() {
    new WOW().init();
  }
  getAll(){

  }
}
