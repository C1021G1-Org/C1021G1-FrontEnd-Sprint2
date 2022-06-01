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
      this.search(pageNumber);

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
    this.getEmployeePerPage(this.indexPagination);

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




  // search() {
  //   this.employeeService.search(this.fromBirthday, this.toBirthday, this.name, this.code, this.address, this.index).subscribe(data => {
  //     this.employeeList = data['content'];
  //     console.log(data)
  //     this.totalPagination = data['totalPages'];
  //   }, error => {
  //     this.snackBar.open("Tìm kiếm không hợp lệ!", "Cảnh báo", {duration: 2000})
  //   })
  // }


  // checkFormNull() {
  //   if (this.searchEmployee.get('formBirthday').value == ''
  //     && this.searchEmployee.get('toBirthday').value == ''
  //     && this.searchEmployee.get('name').value == ''
  //     && this.searchEmployee.get('code').value == ''
  //     && this.searchEmployee.get('address').value == '') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  //
  // }


  // back() {
  //   this.index--;
  //   this.search()
  // }
  //
  // next() {
  //   this.index++;
  //   this.search()
  // }
  //
  // previousPage() {
  //   this.index = 0;
  //   this.search()
  // }
  //
  // lastPage() {
  //   this.index = this.totalPagination - 1;
  //   this.search()
  // }
  //
  // movingNext() {
  //   this.index += 2;
  //   this.search()
  // }
  //
  // loadList(number: number) {
  //   this.index = number - 1;
  //   this.search()
  // }
  //
  // loadList1(number: number) {
  //   this.index = number;
  //   this.search()
  // }
  //
  // loadList2(number: number) {
  //   this.index = number;
  //   this.search()
  // }


  // firtPage() {
  //   this.indexPagination = 0;
  //   this.ngOnInit();
  // }
  //
  // nextPage() {
  //   if (this.indexPagination < this.totalPagination - 1) {
  //     this.indexPagination++;
  //     console.log(this.indexPagination)
  //     this.getEmployeePerPage(this.indexPagination);
  //   } else {
  //     console.log('het trang nextPage')
  //   }
  //
  // }
  //
  // previousPage() {
  //   if (this.indexPagination > 0) {
  //     this.indexPagination--;
  //     console.log(this.indexPagination)
  //     this.getEmployeePerPage(this.indexPagination);
  //   } else {
  //     console.log('het trang  previous')
  //   }
  // }
  //
  // lastPage() {
  //   this.indexPagination = this.totalPagination - 1;
  //   console.log(this.totalPagination)
  //   this.getEmployeePerPage(this.indexPagination);
  // }


//   openDialog(id) {
//     const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
//       width: '500px',
//       data: {datal: id},
//     });
//     dialogRef.afterClosed().subscribe(next => {
//       this.ngOnInit();
//     });
//   }
//
//   openDetails(id) {
//     const dialogRef = this.dialog.open(DetailsEmployeeComponent, {
//       width: '500px',
//       data: {datal: id},
//     });
//     dialogRef.afterClosed().subscribe(next => {
//       this.ngOnInit();
//     });
//   }
//
//
// }


// getAll() {
//   this.employeeService.getAllEmployee(0).subscribe(data => {
//     this.employeeList = data['content'];
//     this.totalEmployee = data['totalPages'] - 1;
//     this.totalEmployeeRecord = data['totalElements'];
//
//   })
// }

// firstPage(formBirthday: string, toBirthday: string, name: string, code: string, address: string, page= 0) {
//   this.indexEmployee = 0;
//   this.employeeService.search(formBirthday.trim(),toBirthday.trim(),name.trim(), code.trim(), address.trim(), this.indexEmployee).subscribe(data => {
//     this.employeeList = data['content'];
//   })
// }
//
// previousPage(formBirthday: string, toBirthday: string, name: string, code: string, address: string, page= 0) {
//   this.indexEmployee = this.indexEmployee - 1;
//   if (this.indexEmployee < 0) {
//     this.indexEmployee = 0;
//     this.ngOnInit();
//   } else {
//     this.employeeService.search(formBirthday.trim(),toBirthday.trim(),name.trim(), code.trim(),address.trim(), this.indexEmployee).subscribe(data => {
//       this.employeeList = data['content'];
//     })
//   }
// }

// nextPage(formBirthday: string, toBirthday: string, name: string, code: string, address: string, page= 0) {
//   this.indexEmployee = this.indexEmployee + 1;
//   if (this.indexEmployee > this.totalEmployee) {
//     this.indexEmployee = this.indexEmployee - 1;
//   } else
//     this.employeeService.search(formBirthday.trim(),toBirthday.trim(),name.trim(), code.trim(), address.trim(), this.indexEmployee).subscribe(data => {
//       this.employeeList = data['content'];
//     })
// }

// lastPage(formBirthday: string, toBirthday: string, name: string, code: string, address: string, page= 0) {
//   this.indexEmployee = this.totalEmployee;
//   // this.employeeService.search(name.trim(),code.trim(),email.trim(),this.totalEmployee).subscribe(data => {
//   //   this.employeeList = data['content'];
// }


//
// findPage(formBirthday: string, toBirthday: string, name: string, code: string, address: string, page= 0) {
//   if (this.totalEmployee >= (page - 1)) {
//     this.indexEmployee = page - 1;
//     this.employeeService.search(formBirthday.trim(),toBirthday.trim(),name.trim(), code.trim(), address.trim(), this.indexEmployee).subscribe(data => {
//       this.employeeList = data['content'];
//     })
//   } else {
//     this.employeeList = [];
//     this.checkNull = true;
//     this.indexEmployee = 0;
//     this.snackBar.open("Không có trang phù hợp!", '', {
//       duration: 2000,
//       verticalPosition: "top"
//     });
//   }
// }

// search(formBirthday: string, toBirthday: string, name: string, code: string, address: string, page= 0) {
//   this.employeeService.search(formBirthday.trim(), toBirthday.trim(), name.trim(), code.trim(), address.trim(), page).subscribe(data => {
//     this.employeeList = data['content'];
//     this.indexEmployee = 0;
//     this.totalEmployee = data['totalPages'] - 1;
//     this.totalEmployeeRecord = data['totalElements'];
//     this.checkNull = false;
//     this.snackBar.open("Tìm kiếm thành công!", 'ok', {
//       duration: 2000,
//       verticalPosition: "top"
//     })
//   }, error => {
//     this.employeeList = [];
//     this.checkNull = true;
//     this.indexEmployee = 0;
//     this.snackBar.open("Tìm kiếm thất bại!", 'error', {
//       duration: 2000,
//       verticalPosition: "top"
//     })
//   })
// }
