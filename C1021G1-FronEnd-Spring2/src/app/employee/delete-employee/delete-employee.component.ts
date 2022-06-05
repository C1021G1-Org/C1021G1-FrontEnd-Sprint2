import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  employeeID: number
  id: any;
  employee: any;
  constructor(private dialog: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: EmployeeService,
              private snackBar: MatSnackBar
  ) {
    console.log(data)
    this.employeeID = this.data
  }

  ngOnInit(): void {
    this.id = this.data.datal;
    this.employeeService.findByIdL(this.id).subscribe((data)=>{
      console.log(data + 'gia tri')
      this.employee = data;
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.id).subscribe(() => {
        this.dialog.close()
        this.snackBar.open('Đã xóa nhân viên thất bại !', 'OK');
      },() =>{
        this.snackBar.open('Xóa không thành công!', 'error');
      }
    )
  }

  onNoClick(): void {
    this.dialog.close();
  }
}
