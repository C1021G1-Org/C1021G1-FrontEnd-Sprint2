import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../new/news.service";
import {New} from '../../new/model/new';


let WOW;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  list8News: New[];


  wow() {
    new WOW().init();

  }
  constructor(private newsService: NewsService) {

    }


  ngOnInit(): void {
    this.getAllNews();
    console.log(this.list8News)
    this.wow();

  }

  getAllNews() {
    this.newsService.getAllNew().subscribe(value => {
      this.list8News = value
    }, error => {
      console.log(error)
    }, () => {
      console.log(this.list8News)
      console.log("Lấy list 8 tin mới nhất thành công")
      console.log("image: " + this.list8News[0].img)
    })


  }
  getAll(){

  }
}
