import {Component, Inject, OnInit} from '@angular/core';
import {CarService} from "../car.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Car} from "../model/car";

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.css']
})
export class DeleteCarComponent implements OnInit {

  constructor(private carService: CarService,
              public dialogRef: MatDialogRef<DeleteCarComponent>,
              @Inject(MAT_DIALOG_DATA) public datal: any,
              private snackBar: MatSnackBar) {
  }

  car: Car;

  ngOnInit(): void {
    console.log(this.datal);
    this.carService.getCarById(this.datal).subscribe(data =>{
        this.car = data;
    })

  }
  delete() {
    this.carService.deleteCar(this.datal).subscribe( ()=>{
      this.dialogRef.close();
      this.snackBar.open("Đã xóa thành công","Close")
    });
  }

  close() {
    this.dialogRef.close();
  }
}
