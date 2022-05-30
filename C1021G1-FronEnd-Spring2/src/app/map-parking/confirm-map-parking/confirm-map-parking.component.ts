import { Component, OnInit } from '@angular/core';
import {MapParkingService} from "../service/map-parking.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UpdateMapParkingComponent} from "../update-map-parking/update-map-parking.component";

@Component({
  selector: 'app-confirm-map-parking',
  templateUrl: './confirm-map-parking.component.html',
  styleUrls: ['./confirm-map-parking.component.css']
})
export class ConfirmMapParkingComponent implements OnInit {

  constructor(private mapService: MapParkingService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openDialog(id: number) {
    this.mapService.findLocationById(id).subscribe(data => {
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
