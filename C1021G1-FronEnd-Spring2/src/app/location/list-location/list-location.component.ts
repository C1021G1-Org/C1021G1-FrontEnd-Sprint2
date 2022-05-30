import {Component, OnInit} from '@angular/core';
import {LocationService} from "../location.service";
import {LocationList} from "../model/LocationList";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})
export class ListLocationComponent implements OnInit {
  LocationList: LocationList[];
  code: string = "";
  id: string = "";
  index: number = 0;
  totalPagination: number;
  number: number=0;

  constructor(private locationService: LocationService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.locationService.getAllLocationAndFloor(this.code, this.id, this.index).subscribe(data => {
      this.LocationList = data['content'];
      this.totalPagination = data['totalPages'];
    }, error => {
      this.snackBar.open("Lỗi hệ thống", "Cảnh báo", {duration: 2000})
    })
  }

  back(){
    this.index--;
    this.search();
  }
  next(){
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
    this.index = 2;
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
}