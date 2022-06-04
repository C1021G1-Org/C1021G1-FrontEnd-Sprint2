import { Component, OnInit } from '@angular/core';
import {NewsService} from "../service/news.service";
import {ActivatedRoute} from "@angular/router";
import {INewsDto} from "../dto/i-news-dto";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news : INewsDto;
  id : number;
  constructor(private newsService :NewsService,
              private activatedRouted: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe(data => {
      this.id = Number(data.get('id'));
      console.log(data)
      this.newsService.findNewsById(this.id).subscribe(dataOfNews => {
        this.news = dataOfNews
      })
    })
  }

}
