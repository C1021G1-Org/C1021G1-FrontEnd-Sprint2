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

  changeColor: Boolean;
  locationId: number
  description: any;
  id: any;
  code : number = Math.floor((Math.random()*899) + 1000);
  constructor(private dialog: MatDialogRef<UpdateMapParkingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mapParkingService: MapParkingService,
              private snackBar: MatSnackBar) {
    this.locationId = this.data
  }

  ngOnInit(): void {
    this.description = this.data.datal.description;
    this.id = this.data.datal.id;
  }


  updateMapParking() {
    this.mapParkingService.updateColorLocation(this.id).subscribe(() => {
      this.dialog.close()
      this.snackBar.open('Đã đặt thành công vị trí', 'OK', {
        duration:2000
      });
    })
  }




}
