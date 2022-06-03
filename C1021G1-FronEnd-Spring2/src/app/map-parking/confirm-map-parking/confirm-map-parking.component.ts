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

  constructor() { }

  ngOnInit(): void {
  }


}
