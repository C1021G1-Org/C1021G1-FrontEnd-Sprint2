import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MapParkingService} from "../service/map-parking.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-map-parking',
  templateUrl: './update-map-parking.component.html',
  styleUrls: ['./update-map-parking.component.css']
})
export class UpdateMapParkingComponent implements OnInit {
  locationId: number
  id: any;
  list: any[];
  listCar: any[];
  addCar: any[];
  constructor(private dialog: MatDialogRef<UpdateMapParkingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mapParkingService: MapParkingService,
              private snackBar: MatSnackBar) {
    this.locationId = this.data
  }

  ngOnInit(): void {
    this.id = this.data.datal.id;
    this.addCar = this.data.list;
    // console.log(this.data.list);
  }
  UpdateLocation() {
    this.mapParkingService.updateColorLocation(this.id).subscribe(() => {
      this.dialog.close()
      this.snackBar.open('Đã đăng ký thành công', 'OK', {
        duration:2000
      });
    })
    this.getAll();
  }
  getAll() {
    this.mapParkingService.getAllLocation(0).subscribe((data: any) => {
      this.list = data.content;
    })
  }

  // getAllCar() {
  //   let email = sessionStorage.getItem("email")
  //   this.mapParkingService.getAllCar(email).subscr ibe(data => {
  //     this.listCar = data;
  //   })
  // }

}
