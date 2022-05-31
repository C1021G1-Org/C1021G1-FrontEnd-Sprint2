import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MapParkingService} from "../service/map-parking.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.mapService.getAllLocation().subscribe((data: any) => {
      this.listLocation = data.content;
    })
  }
  closeDialog() {
    this.dialog.close();
  }
}
