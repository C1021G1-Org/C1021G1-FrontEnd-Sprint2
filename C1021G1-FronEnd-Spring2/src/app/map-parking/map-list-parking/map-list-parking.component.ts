import { Component, OnInit } from '@angular/core';
import {MapParkingService} from "../service/map-parking.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MapWarningComponent} from "../map-warning/map-warning.component";
import {UpdateMapParkingComponent} from "../update-map-parking/update-map-parking.component";
import {ConfirmMapParkingComponent} from "../confirm-map-parking/confirm-map-parking.component";

@Component({
  selector: 'app-map-list-parking',
  templateUrl: './map-list-parking.component.html',
  styleUrls: ['./map-list-parking.component.css']
})
export class MapListParkingComponent implements OnInit {

  listLocation: Location[];
  checkRoleAdmin: boolean;
  checkColor: boolean;

  constructor(private mapService: MapParkingService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.checkRoleAdmin = sessionStorage.getItem('email').includes('admin')?true:false;
    this.mapService.getAllLocation().subscribe((data: any) => {
      this.listLocation = data.content;
      console.log(this.listLocation)
    })
  }

  openDialog(item ,e) {
    console.log(item.isEmpty==true)
    console.log(item)
    if (item.isEmpty == true) {
      const dialogRef = this.dialog.open(MapWarningComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(next => {
        this.ngOnInit();
      });
    }
    else {
      e.target.style.background='blueviolet';
      this.mapService.findLocationById(item.id).subscribe(data => {
        const dialogRef = this.dialog.open(UpdateMapParkingComponent, {
          width: '500px',
          data: {datal: data},
        });
        dialogRef.afterClosed().subscribe(next => {
          this.ngOnInit();
        });
      });
    }
  }


}
