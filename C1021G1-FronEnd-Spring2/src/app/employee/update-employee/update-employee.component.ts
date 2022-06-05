import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Province} from '../model/province';
import {District} from '../model/district';
import {Ward} from '../model/ward';
import {Employee} from '../model/employee';
import {ActivatedRoute} from '@angular/router';
import { Position } from '../model/position';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  listPosition: Position[] = [];
  listProvince: Province[] = [];
  listDistrict: District[] = [];
  listWard: Ward[] = [];
  employee: Employee[] = [];
  id: number;

  constructor(private employeeService: EmployeeService,
              private snackbar: MatSnackBar,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("1")
    this.employeeService.getPosition().subscribe(data => {
      this.listPosition = data;
    })
    this.id = this.activatedRoute.snapshot.params.id;
    this.updateEmployee();
  }

  showPassword() {
    document.getElementById('password').setAttribute('type', 'text')
  }

  hidePassword() {
    document.getElementById('password').setAttribute('type', 'password')
  }

  private updateEmployee() {

  }
}
