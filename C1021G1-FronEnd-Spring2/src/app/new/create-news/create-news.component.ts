import { Component, OnInit } from '@angular/core';
import {NewsService} from "../service/news.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INewsType} from "../model/i-news-type";
import {NewsTypeService} from "../service/news-type.service";


@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  newsType: INewsType[]
  code : number = 0;


  createForm = new FormGroup ({
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

  constructor(private newsService: NewsService,
              private newsTypeService: NewsTypeService){}
  ngOnInit(): void {
    this.getAllNewsType()
  }

  create(){
    this.code+=1;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    this.createForm.get("code").setValue("NE-"+ this.code  )
    this.createForm.get("delFlag").setValue(false)
    this.createForm.get("date").setValue(dateTime)
    this.newsService.createNews(this.createForm.value).subscribe(value => {
      console.log(this.createForm.value)
    })
  }


  getAllNewsType(){
    this.newsTypeService.getAllNews().subscribe(data => {
      this.newsType = data
      console.log(this.newsType)
    })
  }
}
