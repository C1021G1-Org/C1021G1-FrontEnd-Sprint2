import {Component, Inject, OnInit} from '@angular/core';
import {MapParkingService} from '../service/map-parking.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-detail-map-parking',
  templateUrl: './detail-map-parking.component.html',
  styleUrls: ['./detail-map-parking.component.css']
})
export class DetailMapParkingComponent implements OnInit {
  id: number;


  constructor(private dialog: MatDialogRef<DetailMapParkingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: MapParkingService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  closeDialog() {
    this.dialog.close();
  }
}

