import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    code: new FormControl(''),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    phone: new FormControl(''),
    position: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    idWard: new FormControl(''),
    address: new FormControl(''),
    delFlag: new FormControl(''),

  })
  listPosition: Position[] = [];

  constructor(private employeeService: EmployeeService,) { }

  ngOnInit(): void {
    this.employeeService.getPosition().subscribe(data => {
      this.listPosition = data;
    });
  }

}
