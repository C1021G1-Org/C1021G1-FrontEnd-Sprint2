import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MapParkingService} from "../service/map-parking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailMapParkingComponent} from '../detail-map-parking/detail-map-parking.component';

@Component({
  selector: 'app-map-warning',
  templateUrl: './map-warning.component.html',
  styleUrls: ['./map-warning.component.css']
})
export class MapWarningComponent implements OnInit {

  listLocation: Location[];
  constructor(private dialog: MatDialogRef<MapWarningComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mapService: MapParkingService,
              private dialog1: MatDialog) { }

  ngOnInit(): void {
    this.mapService.getAllLocation(0).subscribe((data: any) => {
      this.listLocation = data.content;
    })
  }

  closeDialog() {
    this.dialog.close();
  }
}
