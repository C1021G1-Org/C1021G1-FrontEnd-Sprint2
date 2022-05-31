import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/customer";
import {CustomerService} from "../customer.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailCustomerComponent} from "../detail-customer/detail-customer.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customerList : Customer[];
  formSearchCustomer : FormGroup;
  isSearch : boolean;

  indexPage : number = 0;
  totalPagination: number;


  constructor(private customerService : CustomerService,
              public dialog : MatDialog,
              private formBuilder : FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerService.getListCustomer(0).subscribe(data => {
      this.customerList = data.content;
      this.totalPagination = data['totalPages']
    });

    this.formSearchCustomer = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
      name: [''],
      code: [''],
      phone: ['']
    })
  }

  //ThangDBX phuong thuc tim kiem
  search(page : any){
    console.log("da vao")
    if (page == '' || page == null){
      this.indexPage = 0;
      page = 0;
    }
    this.customerService.searchCustomer(this.formSearchCustomer.value.fromDate,
      this.formSearchCustomer.value.toDate,
      this.formSearchCustomer.value.name,
      this.formSearchCustomer.value.code,
      this.formSearchCustomer.value.phone,
      page).subscribe(data =>{
        if (data == null){
          this.snackBar.open('không tìm thấy kết quả','',{
            duration: 3000
          })

        } else {
          this.customerList = data.content;
          this.totalPagination = data['totalPages']
        }

    }, error => {
        console.log('khong tim thay du lieu')
    })
  }

  //kiem tra co phai dang tim kiem hay khong
  checkSeachForm(){
    if (this.formSearchCustomer.get('fromDate').value == ''
      && this.formSearchCustomer.get('toDate').value ==''
      && this.formSearchCustomer.get('name').value == ''
      && this.formSearchCustomer.get('code').value == ''
      && this.formSearchCustomer.get('phone').value ==''){
      return true;
    } else {
      return false;
    }
  }

  //chon trang
  getListCustomerPerPage(pageNumber : number){
    if (this.checkSeachForm()){
      this.customerService.getListCustomer(pageNumber).subscribe( (data: any) => {
        this.customerList = data.content;
        this.totalPagination = data['totalPages']
      })
    } else {
      this.search(pageNumber)
    }

  }


  previousPage() {

    this.indexPage = 0;
    this.ngOnInit();
  }

  back() {
    this.indexPage--;
    this.getListCustomerPerPage(this.indexPage);
  }

  next() {
    this.indexPage++;
    this.getListCustomerPerPage(this.indexPage)
  }

  movingNext() {
    this.indexPage=3;
    this.getListCustomerPerPage(this.indexPage)
  }

  loadList(number: number) {
    this.indexPage =number -1;
    this.getListCustomerPerPage(this.indexPage)
  }

  loadList1(number: number) {
    this.indexPage = number;
    this.getListCustomerPerPage(this.indexPage)
  }

  loadList2(number: number) {
    this.indexPage = number;
    this.getListCustomerPerPage(this.indexPage)
  }


  lastPage() {
    this.indexPage = this.totalPagination -1 ;
    this.getListCustomerPerPage(this.indexPage);
  }

  openDetailCustomer(id: number) {
      const dialogRef = this.dialog.open(DetailCustomerComponent, {
        width: '100%',
        data: id,
      })
      dialogRef.afterClosed().subscribe(next => {
        this.ngOnInit();
      })
  }


  // go(page: any) {
  //   this.indexPage = page;
  //   this.getListCustomerPerPage(this.indexPage)
  // }
}
