import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {Province} from '../model/province';
import {District} from '../model/district';
import {Ward} from '../model/ward';
import {MatSnackBar} from '@angular/material/snack-bar';
import {min} from 'rxjs/operators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployeeForm: FormGroup = new FormGroup({
    name: new FormControl('',
      [Validators.required, Validators.pattern(/^([a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*){6,40}$/)]),
    code: new FormControl('',
      [Validators.required, Validators.pattern(/^(NV-|nv-)\d{4}$/)]),
    gender: new FormControl('', Validators.required),
    birthday: new FormControl('',
      [Validators.required, this.checkAge]),
    phone: new FormControl('',
      [Validators.required,
        Validators.pattern(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/)]),
    id_position: new FormControl('', Validators.required),
    email: new FormControl('',
      [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)]),
    id_ward: new FormControl('', Validators.required),
    address: new FormControl('',
      [Validators.required]),
  });
  listPosition: Position[] = [];
  listProvince: Province[] = [];
  listDistrict: District[] = [];
  listWard: Ward[] = [];

  constructor(private employeeService: EmployeeService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.employeeService.getPosition().subscribe(data => {
      this.listPosition = data;
    });
    this.employeeService.getProvince().subscribe(data => {
      this.listProvince = data;
    });
  }

  getDistrict(id: number) {
    this.employeeService.getDistrict(id).subscribe(data => {
      this.listDistrict = data;
    });
  }

  getWard(id: number) {
    this.employeeService.getWard(id).subscribe(data => {
      this.listWard = data;
    });
  }

  showPassword() {
    document.getElementById('password').setAttribute('type', 'text');
  }

  hidePassword() {
    document.getElementById('password').setAttribute('type', 'password');
  }

  createEmployee() {
    this.employeeService.createEmployee(this.createEmployeeForm.value).subscribe(data => {
      this.snackbar.open('Tạo mới thành công', 'OK', {
        duration: 2000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['red-snackbar'],
      });
    }, error => {
      this.snackbar.open('Tạo mới không thành công.', 'OK', {
        duration: 2000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['red-snackbar'],
      });
      console.log(error);
    })
  }

  checkAge(birthday : AbstractControl){
    console.log(birthday.value);
    const dayOfBirthObj = new Date(birthday.value)
    const dayOfBirth = Date.now() - dayOfBirthObj.getTime() - 8640000;
    const time = new Date(dayOfBirth);
    const age = time.getUTCFullYear()-1970;
    if(age < 18){
      return {"ageUnder" : true}
    }else{
      return null;
    }
  }
}
