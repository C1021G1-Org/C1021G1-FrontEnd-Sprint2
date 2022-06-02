import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../employee.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css']
})
export class DetailsEmployeeComponent implements OnInit {


  employeeID: number
  id: any;
  employee: any;

  constructor(private dialog: MatDialogRef<DetailsEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService,
              private snackBar: MatSnackBar
  ) {
    console.log(data)
    this.employeeID = this.data
  }

  ngOnInit(): void {
    this.id = this.data.datal;
    this.employeeService.findByIdL(this.id).subscribe((data) => {
      console.log(data + 'gia tri')
      this.employee = data;
    });
  }
}
