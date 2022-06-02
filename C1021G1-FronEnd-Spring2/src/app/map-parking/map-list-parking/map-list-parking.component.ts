import {Component, OnInit} from '@angular/core';
import {MapParkingService} from '../service/map-parking.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MapWarningComponent} from '../map-warning/map-warning.component';
import {UpdateMapParkingComponent} from '../update-map-parking/update-map-parking.component';
import {DetailMapParkingComponent} from '../detail-map-parking/detail-map-parking.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-map-list-parking',
  templateUrl: './map-list-parking.component.html',
  styleUrls: ['./map-list-parking.component.css']
})
export class MapListParkingComponent implements OnInit {

  listLocation: Location[];
  checkRoleAdmin: boolean;
  public index: number = 0;
  totalPagination: number;
  number: number = 0;
  totalLocation: number;
  check: boolean = false;
  searchForm = new FormGroup( {
    value: new FormControl(''),
    value2: new FormControl('')
  });

  constructor(private mapService: MapParkingService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // this.checkRoleAdmin = sessionStorage.getItem('email').includes('admin')?true:false;
    this.list();
  }

  list() {
    this.mapService.getAllLocation(this.index).subscribe((data: any) => {
      this.listLocation = data['content'];
      this.totalLocation = this.listLocation.length;
      this.totalPagination = data['totalPages'];
    });
  }

  openDialog(item, e) {
    if (item.isEmpty == true) {
      this.mapService.findLocationById(item.id).subscribe(data => {
        const dialogRef = this.dialog.open(DetailMapParkingComponent, {
          width: '700px',
          data: {datal: data}
        });
        dialogRef.afterClosed().subscribe(next => {
          this.ngOnInit();
        });
      });
    } else {
      e.target.style.background = 'blueviolet';
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
  searchLocationCode(value : string, page = 0) {
    this.mapService.searchLocation(value, page).subscribe(data => {
      if (data == null) {
        this.listLocation = [];
        this.check = true;
        this.snackBar.open('Tìm kiếm không thành công', 'Lỗi', {
          duration: 2000
        })
      } else {
        this.listLocation = data['content'];
        this.totalPagination = data['totalPages'] - 1;
        this.check = false;
      }
    })
  }

  back() {
    this.index--;
    this.list();
  }

  next() {
    this.index++;
    this.list();
  }

  previousPage() {
    this.index = 0;
    this.snackBar.open('Bạn đang ở trang đầu tiên', 'OK', {
      duration: 2000
    });
    this.list();
  }

  lastPage() {
    this.index = this.totalPagination - 1;
    this.snackBar.open('Bạn đang ở trang cuối cùng', 'OK', {
      duration: 2000
    });
    this.list();
  }

  movingNext() {
    this.index = 2;
    this.list();
  }

  loadList(number: number) {
    this.index = number - 1;
    this.list();
  }

  loadList1(number: number) {
    this.index = number;
    this.list();
  }

  loadList2(number: number) {
    this.index = number;
    this.list();
  }

}
