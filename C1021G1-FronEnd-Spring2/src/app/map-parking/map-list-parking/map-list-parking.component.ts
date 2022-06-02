import { Component, OnInit } from '@angular/core';
import {MapParkingService} from "../service/map-parking.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MapWarningComponent} from "../map-warning/map-warning.component";
import {UpdateMapParkingComponent} from "../update-map-parking/update-map-parking.component";

@Component({
  selector: 'app-map-list-parking',
  templateUrl: './map-list-parking.component.html',
  styleUrls: ['./map-list-parking.component.css']
})
export class MapListParkingComponent implements OnInit {

  listLocation: Location[];
  checkRoleAdmin: boolean;
  checkColor: boolean;
   public index: number = 0;
  totalPagination: number;
   number: number = 0;
  constructor(private mapService: MapParkingService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.checkRoleAdmin = sessionStorage.getItem('email').includes('admin')?true:false;
  this.list()
  }
list(){
  this.mapService.getAllLocation(this.index).subscribe((data: any) => {
    this.listLocation = data['content'];
    this.totalPagination=data['totalPages'];
  })
}
  openDialog(item ,e) {
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

  back() {
    this.index--;
    this.list()
  }

  next() {
    this.index++;
    this.list()
  }

  previousPage() {
    this.index = 0;
    this.list()
  }

  lastPage() {
    this.index = this.totalPagination - 1;
    this.list()
  }

  movingNext() {
    this.index = 2;
    this.list()
  }

  loadList(number: number) {
    this.index = number - 1;
    this.list()
  }

  loadList1(number: number) {
    this.index = number;
    this.list()
  }

  loadList2(number: number) {
    this.index = number;
    this.list()
  }

}
