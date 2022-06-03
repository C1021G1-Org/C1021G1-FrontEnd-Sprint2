import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  employeeID: number
  id: any;
  employee: any;
  constructor(private dialog: MatDialogRef<DetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService,
              private snackBar: MatSnackBar
  ) {
    console.log(data)
    this.employeeID = this.data
  }

  ngOnInit(): void {
    this.id = this.data.datal;
    this.employeeService.findById(this.id).subscribe((data)=>{
      console.log(data + 'gia tri')
      this.employee = data;
    });
  }
  onNoClick(): void {
    this.dialog.close();
  }

}
