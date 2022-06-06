import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewsService} from '../../new/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {CarManagementService} from '../car-management.service';
import {CarChoose} from '../../dto/CarChoose';
import {MatDialog} from '@angular/material/dialog';
import {SearchCarComponent} from '../search-car/search-car.component';
import {EmptyLocation} from '../model/emptyLocation';

@Component({
  selector: 'app-management-car-in',
  templateUrl: './management-car-in.component.html',
  styleUrls: ['./management-car-in.component.css']
})
export class ManagementCarInComponent implements OnInit {
  myDate = new Date();
  selectedImg: any = null;
  imageThis = '';
  loading: boolean = false;
  checkImgCarIn: boolean = false;
  checkImgCarOut: boolean = false;
  //........
  flag: boolean = false;
  carChooseDto: CarChoose;
  //
  emptyLocation: EmptyLocation;
  formTicket: FormGroup;

  file;
  urlFile:string

  idLocation: number;

  sourceImgIn : string;

  startDate: string;

  endDate: string;

  timeIn: string;

  timeOut: string;
  private carChoose: CarChoose;

  constructor(
    private carService: CarManagementService,
    private snackBar: MatSnackBar,
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    // private alertService: AlertService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.carChooseDto = this.carService.currentTicket;
    console.log(this.carChooseDto);
    this.checkImgCarIn = false;
    this.formTicket =  new FormGroup({
      code: new FormControl(''),
      endDate: new FormControl(''),
      carCompany: new FormControl(''),
      carPlate: new FormControl(''),
      startDate: new FormControl(''),
      imgCarOut: new FormControl(''),
      imgCarIn: new FormControl(''),
      idFloor: new FormControl(''),
      customerPhone: new FormControl(''),
      carName: new FormControl(''),
      idTicketType: new FormControl(''),
      customerName:new FormControl(''),
      timeIn:new FormControl(''),
      timeOut:new FormControl(''),
      idLocation:new FormControl(''),
    });
    // this.formTicket.patchValue(this.carChooseDto);
  }

  onFileChange(event) {
    console.log(event.files);
    this.file = event.value;
    console.log(this.file);
  }

  //
  // readFile() {
  //   this.ticketService.senPathFile(this.file).subscribe((data) => {
  //     console.log(data);
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  showPreview1(event: any) {
    this.checkImgCarOut = true;
    this.formTicket.get('timeOut').setValue(this.changTime(new Date()));
    this.formTicket.get('imgCarOut').setValue(this.formTicket.get('imgCarIn').value);
    this.timeOut = this.changTime(new Date());

  }


  showPreview(event: any) {
    // lấy image về
    this.selectedImg = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
        this.checkImgCarIn = true;
      };
    }
    console.log(this.selectedImg.name);
    this.carService.senPathFile(this.selectedImg.name).subscribe((data)=>{
      console.log(data);
      this.formTicket.get('carPlate').setValue(data.path);
      this.carService.plate = data.path;
      this.updateImage();
    },error => {
      console.log(error);
    })
    // hiển thị image đã lấy lên trên trang edit


  }

  updateImage() {
    //loading
    this.loading = true;
    // upload image to firebase
    const nameImg = this.selectedImg.name;
    // const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImg).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log('url la')
          this.urlFile=url;
          this.sourceImgIn = url
          console.log(url);
          // this.carService.senPathFile(this.urlFile).subscribe((data)=>{
          //   console.log(data);
            this.carService.chooseCar( this.carService.plate).subscribe((data) => {

                if (data.length > 0) {
                  this.carChoose = data[0];
                  let timeInToString =this.carChoose.timeIn+'t';
                  let timOutToString =this.carChoose.timeOut+'t';
                  console.log('333333');
                  console.log(this.carChoose);
                  // this.formTicket.setValue(this.carChoose)
                  this.formTicket.get('carName').setValue(this.carChoose.carName);
                  this.formTicket.get('customerName').setValue(this.carChoose.customerName);
                  this.formTicket.get('carCompany').setValue(this.carChoose.carCompany);
                  this.formTicket.get('customerPhone').setValue(this.carChoose.customerPhone);
                  let startDate : string = this.formTicket.get('startDate').value
                  if(startDate.length > 0){
                    console.log(this.formTicket.get('startDate').value);
                    console.log(this.getCurrentDate(new Date()));
                    this.formTicket.get('startDate').setValue(this.carService.currentTicket.startDate);
                    this.formTicket.get('endDate').setValue(this.carService.currentTicket.endDate);
                  }else {
                    this.startDate = this.changDate(new Date())
                    console.log("dscdsc");
                    console.log(this.changDate(new Date()));
                    this.formTicket.get('startDate').setValue(this.getCurrentDate(new Date()));

                    if(this.formTicket.get('idTicketType').value == 1){
                      let date : Date = (new Date((new Date()).getTime() + 24 * 60 * 60 * 1000))
                      this.endDate = this.changDate(date)
                      this.formTicket.get('endDate').setValue(this.getCurrentDate(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)));
                    }else {
                      let date : Date = (new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000))
                      this.endDate = this.changDate(date)
                      this.formTicket.get('endDate').setValue(this.getCurrentDate(new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000)));
                    }
                  }

                  this.formTicket.get('imgCarIn').setValue(url);
                  this.timeIn = this.changTime(new Date());
                  this.formTicket.get('imgCarOut').setValue(this.carChoose.imgCarOut);
                  // this.formTicket.get('timeIn').setValue(this.carChoose.timeIn);
                  // this.formTicket.get('timeOut').setValue(this.carChoose.timeOut);
                  let idTicketType: string = this.carChoose.idTicketType + 'abc' ;
                  if(idTicketType.length != 7){
                    this.formTicket.get('idTicketType').setValue(this.carChoose.idTicketType);
                  }else {
                    this.formTicket.get('idTicketType').setValue("1");
                  }

                  this.formTicket.get('idLocation').setValue(this.carChoose.idLocation);

                  if (timOutToString.length>11){
                    this.timeIn = this.changTime(new Date());
                    this.formTicket.get('timeIn').setValue(this.getCurrentDateTime(new Date()));
                    this.formTicket.get('timeOut').setValue('')
                  }else if (timeInToString.length>11){
                    this.checkImgCarOut = true;
                    this.formTicket.get('timeOut').setValue(this.getCurrentDateTime(new Date()));
                    this.formTicket.get('imgCarOut').setValue(this.carChoose.imgCarIn);
                    this.timeOut = this.changTime(new Date());
                    this.timeIn = this.changTime(new Date())
                    this.formTicket.get('timeIn').setValue(this.carChoose.timeIn);
                  }else{
                    this.timeIn = this.changTime(new Date())
                    this.formTicket.get('timeIn').setValue(this.getCurrentDateTime(new Date()));
                  }

                  this.carService.getLocation().subscribe((data) => {
                    this.idLocation = data.idLocation
                    let idLocation : string = this.carChoose.idLocation + "a"
                    if(idLocation.length != 5){
                      this.formTicket.get("idLocation").setValue(this.carChoose.nameLocation);
                      this.formTicket.get("idFloor").setValue(this.carChoose.idFloor);
                    }else {
                      this.formTicket.get("idFloor").setValue(data.nameFloor);
                      this.formTicket.get("idLocation").setValue(data.nameLocation);
                    }

                  })

                  // if(this.carChoose.timeIn.length>0){
                  //   this.formTicket.get('timeOut').value(this.getCurrentDateTime(new Date()))
                  //   this.formTicket.get('imgCarOut').value(this.formTicket.get('imgCarOut'));
                  // }
                  let imgIn : string = this.carChoose.imgCarIn + "path"
                  if(imgIn.length != 8){
                    this.formTicket.get("imgCarIn").setValue(this.carChoose.imgCarIn);
                  }else {
                    this.formTicket.get("imgCarIn").setValue(this.sourceImgIn);
                    console.log("hieu");
                    console.log(this.sourceImgIn);
                  }

                  // alert(timeInToString)
                  if(timeInToString.length>11){

                  }

                } else {
                  this.router.navigateByUrl('customer');
                }
              },error => {
                console.log("helo3");
                console.log(error);
              }
            )
          // },error => {
          //   console.log(error);
          // })
          // this.newsForm.get('imageNews').patchValue(url);
          // console.log(this.newsForm);
          // this.newsService.updateNews(this.newsForm.value, this.activatedRoute.snapshot.params.id).subscribe(() => {
          //   console.log(this.newsForm)
          //
          //   this.snackBar.open("Cập nhập thành công!",'OK', {
          //     duration:2000
          //   });
          //   this.router.navigateByUrl('news/list-news');
          })

      })
    ).subscribe();

  }

  getCurrentDate(time : Date): string {
    return formatDate(time, 'dd-MM-yyyy', 'en-US');
  }

  getCurrentDateTime(time : Date): string {
    return formatDate(time, 'dd-MM-yyyy hh : mm : ss a', 'en-US');
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(SearchCarComponent, {
      width: '500px',
      data: {datal: id},
    });
    dialogRef.afterClosed().subscribe(next => {
      // console.log( this.carService.currentTicket);
      // this.formTicket.setValue(this.carService.currentTicket);
      // console.log(this.carChooseDto);
      // console.log("hello");
      // console.log(this.formTicket.value);
      this.formTicket.get('carPlate').setValue(this.carService.currentTicket.carPlate);
      this.formTicket.get('carName').setValue(this.carService.currentTicket.carName);
      this.formTicket.get('customerName').setValue(this.carService.currentTicket.customerName);
      this.formTicket.get('carCompany').setValue(this.carService.currentTicket.carCompany);
      this.formTicket.get('customerPhone').setValue(this.carService.currentTicket.customerPhone);

      let startDate : string = this.formTicket.get('startDate').value
      if(startDate.length > 0){
        console.log(this.formTicket.get('startDate').value);
        console.log(this.getCurrentDate(new Date()));
        this.formTicket.get('startDate').setValue(this.carService.currentTicket.startDate);
        this.formTicket.get('endDate').setValue(this.carService.currentTicket.endDate);
      }else {
        this.startDate = this.changDate(new Date())
        console.log("dscdsc");
        console.log(this.changDate(new Date()));
        this.formTicket.get('startDate').setValue(this.getCurrentDate(new Date()));

        if(this.formTicket.get('idTicketType').value == 1){
          let date : Date = (new Date((new Date()).getTime() + 24 * 60 * 60 * 1000))
          this.endDate = this.changDate(date)
          this.formTicket.get('endDate').setValue(this.getCurrentDate(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)));
        }else {
          let date : Date = (new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000))
          this.endDate = this.changDate(date)
          this.formTicket.get('endDate').setValue(this.getCurrentDate(new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000)));
        }
      }

      this.formTicket.get('imgCarIn').setValue(this.carService.currentTicket.imgCarIn);
      this.formTicket.get('imgCarOut').setValue(this.carService.currentTicket.imgCarOut);
      this.formTicket.get('timeIn').setValue(this.carService.currentTicket.timeIn);
      this.formTicket.get('timeOut').setValue(this.carService.currentTicket.timeOut);

      let idTicketType: string = this.carService.currentTicket.idTicketType + 'abc' ;
      console.log(idTicketType.length);
      if(idTicketType.length != 7){
        this.formTicket.get('idTicketType').setValue(this.carService.currentTicket.idTicketType);
      }else {
        this.formTicket.get('idTicketType').setValue("1");
      }



      this.formTicket.get('idLocation').setValue(this.carService.currentTicket.idLocation);

      if (this.formTicket.get('timeOut').value != ""){
        this.timeIn = this.changTime(new Date())
        this.formTicket.get('timeIn').setValue(this.getCurrentDateTime(new Date()));
        this.formTicket.get('timeOut').setValue('')
      }else if (this.formTicket.get('timeIn').value == ''){
        this.timeIn = this.changTime(new Date())
        this.formTicket.get('timeIn').setValue(this.getCurrentDateTime(new Date()));
        this.formTicket.get('timeOut').setValue('');
      }

      this.carService.getLocation().subscribe((data) => {
        this.idLocation = data.idLocation
        let idLocation : string = this.carService.currentTicket.idLocation + "a"
        if(idLocation.length != 5){
          this.formTicket.get("idLocation").setValue(this.carService.currentTicket.nameLocation);
          this.formTicket.get("idFloor").setValue(this.carService.currentTicket.idFloor);
        }else {
          this.formTicket.get("idFloor").setValue(data.nameFloor);
          this.formTicket.get("idLocation").setValue(data.nameLocation);
        }

      })

      let imgIn : string = this.carService.currentTicket.imgCarIn + "path"
      if(imgIn.length != 8){
        this.formTicket.get("imgCarIn").setValue(this.carService.currentTicket.imgCarIn);
      }else {
        this.formTicket.get("imgCarIn").setValue(this.sourceImgIn);
        console.log("hieu");
        console.log(this.sourceImgIn);
      }




    });
  }


  setTicketType(ticketType: HTMLSelectElement) {
    if (ticketType.value == "1" || ticketType.value == ""){
      this.formTicket.get("endDate").setValue(this.getCurrentDate(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)));
    }else {
      this.formTicket.get("endDate").setValue(this.getCurrentDate(new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000)));
    }
  }

  register() {
    let startDate : string = this.formTicket.get("startDate").value
    this.formTicket.get("startDate").setValue(this.startDate)
    let endDate : string = this.formTicket.get("endDate").value
    this.formTicket.get("endDate").setValue(this.endDate)
    let timeIn : string = this.formTicket.get("timeIn").value
    this.formTicket.get("timeIn").setValue(this.timeIn)
    let timeOut : string = this.formTicket.get("timeOut").value
    this.formTicket.get("timeOut").setValue(this.timeOut)
    let renameLocation : string = this.formTicket.get("idLocation").value

    this.formTicket.get("idLocation").setValue(this.idLocation)
    if (this.formTicket.valid) {
      this.carService.registerTicket(this.formTicket.value).subscribe(data => {
        console.log(data);
        this.snackBar.open('Đăng kí vé thành công!', '', {
          duration: 5000
        });
        this.router.navigateByUrl('/');
      },error => {
        this.formTicket.get("idLocation").setValue(renameLocation);
        this.formTicket.get("startDate").setValue(startDate);
        this.formTicket.get("endDate").setValue(endDate);
        this.formTicket.get("timeIn").setValue(timeIn);
        this.formTicket.get("timeOut").setValue(timeOut);
      })
    }
  }
  changDate(date : Date){
    let dateOfMonth = date.getDate();
    let dateOfMonthToString = "";
    if(dateOfMonth < 10){
      dateOfMonthToString = "0" + dateOfMonth;
    }else {
      dateOfMonthToString = "" + dateOfMonth;
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10){
      return year + "-0" + month + "-" + dateOfMonthToString;
    }else {
      return year + "-" + month + "-" + dateOfMonthToString;
    }
  }

  changTime(date : Date){
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss', 'en-US');

  }


  pay() {
    console.log("12312");
    this.formTicket.get('imgCarOut').setValue(this.formTicket.get('imgCarIn').value);
    let stringOfTimeOut = this.formTicket.get('timeOut').value;
    this.formTicket.get('timeOut').setValue(this.timeOut)
    let startDate : string = this.formTicket.get("startDate").value
    this.formTicket.get("startDate").setValue(this.startDate)
    let endDate : string = this.formTicket.get("endDate").value
    this.formTicket.get("endDate").setValue(this.endDate)
    let timeIn : string = this.formTicket.get("timeIn").value
    this.formTicket.get("timeIn").setValue(this.timeIn)
    let timeOut : string = this.formTicket.get("timeOut").value
    this.formTicket.get("timeOut").setValue(this.timeOut)
    let renameLocation : string = this.formTicket.get("idLocation").value

    this.formTicket.get("idLocation").setValue(this.idLocation)
    if (this.formTicket.valid) {
      this.carService.pay(this.formTicket.value).subscribe(data => {
        console.log(data);
        this.snackBar.open('Đăng kí vé thành công!', '', {
          duration: 5000
        });
        this.router.navigateByUrl('/');
      },error => {
        this.formTicket.get("idLocation").setValue(renameLocation);
        this.formTicket.get("startDate").setValue(startDate);
        this.formTicket.get("endDate").setValue(endDate);
        this.formTicket.get("timeIn").setValue(timeIn);
        this.formTicket.get("timeOut").setValue(timeOut);

      })
    }
  }

  // chooseCar(carPlate: string) {
  //   console.log(carPlate);
  //   return this.carService.chooseCar(carPlate).subscribe((data) => {
  //       this.carChoose = data;
  //       console.log("data");
  //       console.log(data);
  //       if (data.length > 0) {
  //         this.carService.currentTicket = data[0];
  //         console.log("helo1");
  //         console.log(this.carService.currentTicket);
  //       } else {
  //         this.router.navigateByUrl('customer');
  //       }
  //     },error => {
  //       console.log("helo3");
  //       console.log(error);
  //     }
  //   )
  //     ;
  // }
}
