import { Component, OnInit } from '@angular/core';
import {NewsService} from "../service/news.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {INewsDto} from "../dto/i-news-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {INews} from "../model/i-news";
import {INewsType} from "../model/i-news-type";
import {NewsTypeService} from "../service/news-type.service";

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {
  id;
  news: INewsDto;
  newsTypes: INewsType[];


  constructor(private newsService: NewsService,
              private newsTypeService: NewsTypeService,
              private router: Router,
              private activatedRouted: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  updateForm = new FormGroup({
    id: new FormControl(""),
    code: new FormControl(""),
    author: new FormControl(""),
    title: new FormControl(""),
    date: new FormControl(""),
    description: new FormControl(""),
    img: new FormControl(""),
    delFlag: new FormControl(""),
    newsType: new FormControl("")
  })

  ngOnInit(): void {
    this.newsTypeService.getAllNews().subscribe(data => {
      this.newsTypes = data;
    })
    this.activatedRouted.paramMap.subscribe(data => {
          this.id = data.get('id')
          this.newsService.findTicketById(this.id).subscribe(data => {
              this.news = data

            // var parser = new DOMParser();
            // var doc = parser.parseFromString(this.news.img., 'text/html');

            this.updateForm.get("id").setValue(this.news.id);
              this.updateForm.get("code").setValue(this.news.code);
              this.updateForm.get("author").setValue(this.news.author);
              this.updateForm.get("title").setValue(this.news.title);
              this.updateForm.get("date").setValue(this.news.date);
              this.updateForm.get("description").setValue(this.news.description);
              this.updateForm.get("newsType").setValue(this.news.newsType);
              this.updateForm.get("delFlag").setValue(this.news.delFlag);
              this.updateForm.get("img").setValue(this.news.img);//bug
            console.log(this.updateForm.value)
      })
    })
  }


  update() {

  }
}
