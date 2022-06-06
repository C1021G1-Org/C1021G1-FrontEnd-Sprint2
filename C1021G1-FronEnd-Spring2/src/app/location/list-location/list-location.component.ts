
import {Component, OnInit} from '@angular/core';
import {LocationService} from "../location.service";
import {LocationList} from "../model/LocationList";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Floor} from "../model/floor";
import { MatDialog } from '@angular/material/dialog';
import { DeleteLocationComponent } from '../delete-location/delete-location.component';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})
export class ListLocationComponent implements OnInit {
  LocationList: LocationList[];
  floorList: Floor[];
  code: string = "";
  id: string = "";
  index: number = 0;
  totalPagination: number;
  number: number = 0;

  isStatus: boolean = false;
  constructor(private locationService: LocationService,
              private snackBar: MatSnackBar,
              private dialog : MatDialog) {
  }

  ngOnInit(): void {
    this.locationService.getAllFloor().subscribe(data => {
      this.floorList = data;
      console.log(this.floorList)
      this.search();
    }, error => {
      this.snackBar.open("Lỗi hệ thống", "Cảnh báo", {duration: 2000})

    })
  }

  search() {
    this.locationService.getAllLocationAndFloor(this.code.trim(), this.id.trim(), this.index).subscribe(data => {
      this.LocationList = data['content'];
      this.totalPagination = data['totalPages'];
      if (this.code != '' || this.id != '' && this.index==0){
        this.snackBar.open("Tìm kiếm thành công có " + data['totalElements'] + " kết quả!", "OK", {duration: 2000})
      }
    }, error => {
       this.isStatus = true;
      this.snackBar.open("Tìm kiếm thất bại!", "OK", {duration: 2000})
    })
  }

  back() {
    this.index--;
    this.search();
  }

  next() {
    this.index++;
    this.search();
  }

  previousPage() {
    this.index = 0;
    this.search();
  }

  lastPage() {
    this.index = this.totalPagination - 1;
    this.search();
  }

  movingNext() {
    this.index += 2;
    this.search();
  }

  loadList(number: number) {
    this.index = number - 1;
    this.search();
  }

  loadList1(number: number) {
    this.index = number;
    this.search();
  }

  loadList2(number: number) {
    this.index = number;
    this.search();
  }
  //trong ta hien thi dialog
  openDialog(id: number) {
    this.locationService.findLocationById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteLocationComponent, {
        width: '500px',
        data: {datal: data},
      });
      dialogRef.afterClosed().subscribe(next => {
        this.ngOnInit();
      });
    });
  }
}

