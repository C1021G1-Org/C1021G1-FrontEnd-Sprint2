import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewsService} from '../../new/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-management-car-in',
  templateUrl: './management-car-in.component.html',
  styleUrls: ['./management-car-in.component.css']
})
export class ManagementCarInComponent implements OnInit {
  myDate  = new Date();
  selectedImg: any = null;
  imageThis = '';
  loading: boolean = false;
  //........
  flag: boolean = false;


  constructor(
    private snackBar: MatSnackBar,
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private alertService: AlertService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }


  showPreview(event: any) {
    // lấy image về
    this.selectedImg = event.target.files[0];
    // hiển thị image đã lấy lên trên trang edit
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
      };
    }
  }

  update() {
    //loading
    this.loading = true;
    // upload image to firebase
    const nameImg = this.getCurrentDateTime();
    // const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    // this.storage.upload(nameImg, this.selectedImg).snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe((url) => {
    //       this.newsForm.get('imageNews').patchValue(url);
    //       console.log(this.newsForm);
    //       this.newsService.updateNews(this.newsForm.value, this.activatedRoute.snapshot.params.id).subscribe(() => {
    //         console.log(this.newsForm)
    //
    //         this.snackBar.open("Cập nhập thành công!",'OK', {
    //           duration:2000
    //         });
    //         this.router.navigateByUrl('news/list-news');
    //       })
    //     });
    //   })
    // ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
