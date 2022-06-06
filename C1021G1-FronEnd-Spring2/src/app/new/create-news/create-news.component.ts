import {Component, OnInit} from '@angular/core';
import {NewsService} from "../service/news.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INewsType} from "../model/i-news-type";
import {NewsTypeService} from "../service/news-type.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  newsType: INewsType[]
  loadingSubmit : boolean = false
  thisImg: string;


  createForm = new FormGroup ({
    id: new FormControl(""),
    code: new FormControl(""),
    delFlag: new FormControl(""),
    date: new FormControl(""),


    author: new FormControl("",[Validators.required,
                                                      Validators.minLength(5),
                                                      Validators.maxLength(50),
                                                      Validators.pattern("^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+$")],),
    title: new FormControl("", [Validators.required,
                                                      Validators.minLength(3),
                                                       Validators.maxLength(255)
    ]),
    description: new FormControl("", [Validators.required,
                                                            Validators.minLength(32),
      ]),
    img: new FormControl("", [Validators.required]),
    newsType: new FormControl("", [Validators.required])
  })


  constructor(private newsService: NewsService,
              private newsTypeService: NewsTypeService,
              private snackBar: MatSnackBar,
              private router: Router
  ){}
  ngOnInit(): void {
    this.getAllNewsType()

  }

  create() {
    this.loadingSubmit = true;
    console.log(this.createForm.value)
    // set giá trị mặc định
    let num1: number = Math.floor(Math.random() * 1500 + 1);
    let num2: number = Math.floor(Math.random() * 1500 + 1);
    let num3: number = Math.floor(Math.random() * 300 + 1);
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    this.createForm.get("code").setValue("NE-" + (num1 + num2 - num3))
    this.createForm.get("delFlag").setValue(false)
    this.createForm.get("date").setValue(dateTime)

    //trim
    this.createForm.get("author").setValue(this.createForm.get('author').value.trim())
    this.createForm.get("title").setValue(this.createForm.get('title').value.trim())
    this.createForm.get("description").setValue(this.createForm.get('description').value.trim())



          this.newsService.createNews(this.createForm.value).subscribe(
            value => {
              console.log(this.createForm.get('img').value)
            },
            error => {
              this.snackBar.open("Thêm mới tin tức thất bại", "OK", {
                duration: 3000
              })
              this.loadingSubmit = false;
            }, () => {
              this.router.navigateByUrl("/updateNews/" + 4);
            });
          this.snackBar.open("Thêm mới tin tức thành công", "OK", {
            duration: 2000
          });

        }


  getAllNewsType(){
    this.newsTypeService.getAllNews().subscribe(data => {
      this.newsType = data
      console.log(this.newsType)
    })
  }


  changeImg(value: string) {
    console.log(value)
    this.thisImg = value
    console.log(this.thisImg)
  }

  getImg(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ev => {
       this.thisImg = fileReader.result as string;
        this.createForm.get('img').setValue(this.thisImg)

    }
  }
}
