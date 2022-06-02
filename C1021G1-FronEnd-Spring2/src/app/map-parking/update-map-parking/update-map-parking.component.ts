import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MapParkingService} from "../service/map-parking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MapParking} from '../model/map-parking';

@Component({
  selector: 'app-update-map-parking',
  templateUrl: './update-map-parking.component.html',
  styleUrls: ['./update-map-parking.component.css']
})
export class UpdateMapParkingComponent implements OnInit {
  locationId: number
  id: any;
  list: any[];
  constructor(private dialog: MatDialogRef<UpdateMapParkingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mapParkingService: MapParkingService,
              private snackBar: MatSnackBar,
              private active: ActivatedRoute) {
    this.locationId = this.data
  }

  ngOnInit(): void {
    this.id = this.data.datal.id;
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
      this.list = data.content
    })
  }
}
