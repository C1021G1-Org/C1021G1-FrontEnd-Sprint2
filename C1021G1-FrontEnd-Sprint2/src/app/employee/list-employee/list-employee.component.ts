import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../model/employee";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {DetailsEmployeeComponent} from "../details-employee/details-employee.component";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: any;
  totalEmployeeRecord: number;
  totalEmployee: number

  isSearch:boolean;
  searchEmployee: FormGroup;
  p: number;
  indexPagination: number = 0;
  totalPagination: number;
  checkNull: Boolean = false;


  constructor(private employeeService: EmployeeService,     private formBuilder: FormBuilder,  public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isSearch = true;
    this.employeeService.getAllEmployee(0).subscribe(data => {
      // console.log(data)
      this.employeeList = data.content;
      this.totalPagination = data['totalPages']
    });

    this.searchEmployee = this.formBuilder.group({
      id: [''],
      birthday: [''],
      gender: [''],
      phone: [''],
      address:  [''],
      delFlag:  [''],
      formBirthday: [''],
      toBirthday: [''],
      name: [''],
      code: [''],
    });
  }


  search(pageNumber: any) {
    if(pageNumber == '' || pageNumber == null){
      pageNumber = 0
      this.indexPagination = 0;
    }
    this.employeeService.search(this.searchEmployee.value.formBirthday, this.searchEmployee.value.toBirthday, this.searchEmployee.value.name,
      this.searchEmployee.value.code,this.searchEmployee.value.address, pageNumber).subscribe((data: any) => {
        console.log(data+'search')
        this.employeeList = data.content;
        this.totalPagination = data['totalPages'];
        this.snackBar.open('Đã tìm kiếm thành công', 'OK')
        this.checkNull = false;
      },error => {
        this.employeeList = [];
        this.checkNull = true;
        this.snackBar.open('Đã tìm kiếm thất bại', 'error')
      }
    );
  }

  checkFormNull() {
    if (this.searchEmployee.get('formBirthday').value == ''
      && this.searchEmployee.get('toBirthday').value == ''
      && this.searchEmployee.get('name').value == ''
      && this.searchEmployee.get('code').value == ''
      && this.searchEmployee.get('address').value == '') {
      return true;
    } else {
      return false;
    }

  }

  getEmployeePerPage(pageNumber: number) {
    if (this.checkFormNull()) {
      this.employeeService.getAllEmployee(pageNumber).subscribe((data: any) => {
        console.log('no search')
        this.employeeList = data.content;
        this.totalPagination = data['totalPages']
      });
    } else {

      this.search(this.indexPagination);

    }
  }

  firtPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPagination - 1) {
      this.indexPagination++;
      console.log(this.indexPagination)
      this.getEmployeePerPage(this.indexPagination);
    } else {
      console.log('het trang nextPage')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      console.log(this.indexPagination)
      this.getEmployeePerPage(this.indexPagination);
    } else {
      console.log('het trang  previous')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    console.log(this.totalPagination)
    this.getEmployeePerPage(this.indexPagination);
  }


  movingNext() {
    this.indexPagination = 2;
    this.getEmployeePerPage(this.indexPagination);

  }

  loadList(number: number) {
    this.indexPagination = number - 1;
    this.getEmployeePerPage(this.indexPagination);
  }

  loadList1(number: number) {
    this.indexPagination = number;
    this.getEmployeePerPage(this.indexPagination);
  }

  loadList2(number: number) {
    this.indexPagination = number;
    if(this.indexPagination <= this.totalPagination){
      this.getEmployeePerPage(this.indexPagination);

    }

  }


  openDialog(id) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '500px',
      data: {datal: id},
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    });
  }

  openDetails(id) {
    const dialogRef = this.dialog.open(DetailsEmployeeComponent, {
      width: '500px',
      data: {datal: id},
    });
    dialogRef.afterClosed().subscribe(next => {
      this.ngOnInit();
    });
  }


}





