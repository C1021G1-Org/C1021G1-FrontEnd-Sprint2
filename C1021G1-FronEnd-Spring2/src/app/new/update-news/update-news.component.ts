import { Component, OnInit } from '@angular/core';
import {NewsService} from "../service/news.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {INewsDto} from "../dto/i-news-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  thisImg: String ;
  thisImage: String ;
  loadingSubmit: boolean = false


  constructor(private newsService: NewsService,
              private newsTypeService: NewsTypeService,
              private router: Router,
              private activatedRouted: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  updateForm = new FormGroup({
    id: new FormControl(""),
    code: new FormControl(""),
    date: new FormControl(""),
    delFlag: new FormControl(""),



    author: new FormControl("",[Validators.required,
                                                      Validators.minLength(5),
                                                      Validators.maxLength(50),
                                                      Validators.pattern("^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$")]),
    title: new FormControl("", [Validators.required,
                                                       Validators.minLength(3),
                                                       Validators.maxLength(255)
    ]),
    description: new FormControl("", [Validators.required,
                                                            Validators.minLength(32)
    ]),
    img: new FormControl("", [Validators.required]),
    newsType: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
    this.newsTypeService.getAllNews().subscribe(data => {
      this.newsTypes = data;
    })
    this.activatedRouted.paramMap.subscribe(data => {
          this.id = data.get('id')
          this.newsService.findNewsById(this.id).subscribe(data => {
              this.news = data
              this.thisImg = this.news.img
            console.log(data)

            this.updateForm.get("id").setValue(this.news.id);
              this.updateForm.get("code").setValue(this.news.code);
              this.updateForm.get("author").setValue(this.news.author);
              this.updateForm.get("title").setValue(this.news.title);
              this.updateForm.get("date").setValue(this.news.date);
              this.updateForm.get("description").setValue(this.news.description);
              this.updateForm.get("newsType").setValue(this.news.newsType);
              this.updateForm.get("delFlag").setValue(this.news.delFlag);
              this.updateForm.get("img").setValue(this.news.img)



          })
    })
  }


  update() {
    this.loadingSubmit = true
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.updateForm.get('date').setValue(date + ' ' + time)
    this.updateForm.get('author').setValue(this.updateForm.get('author').value.trim() )
    this.updateForm.get("title").setValue(this.updateForm.get('title').value.trim())
    this.updateForm.get("description").setValue(this.updateForm.get('description').value.trim())

    this.updateForm.get('date').setValue(date + ' ' + time)
    this.updateForm.get('date').setValue(date + ' ' + time)
    this.updateForm.get('date').setValue(date + ' ' + time)
    this.updateForm.get('date').setValue(date + ' ' + time)
    this.newsService.editNews(this.news.id, this.updateForm.value).subscribe( value => {
      console.log(this.news.id, this.updateForm.value);

    }, error => {
      this.snackBar.open("Chỉnh sửa thất bại", "Fails" , {
        duration: 3000
      })}, () => {
      this.router.navigateByUrl("/newsDetail/" + this.news.id);
    });
    this.snackBar.open("Chỉnh sửa thành công ", "OK" ,{
      duration: 3000
    })
  }

  changeImg(value: string) {
    console.log(value)
    this.thisImg = ""
    this.thisImg = value
    console.log(this.thisImg)

  }

  getImg(event: any) {
    this.thisImg = ""
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ev => {
      this.thisImg = fileReader.result as string;
      this.thisImage = this.thisImg;
      console.log(this.thisImg)
    }
  }
}
