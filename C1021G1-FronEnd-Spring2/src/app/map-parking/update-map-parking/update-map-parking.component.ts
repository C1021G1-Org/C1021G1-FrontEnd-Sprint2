import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MapParkingService} from "../service/map-parking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-map-parking',
  templateUrl: './update-map-parking.component.html',
  styleUrls: ['./update-map-parking.component.css']
})
export class UpdateMapParkingComponent implements OnInit {
  locationList: any;
  formUpdate: FormGroup = new FormGroup({
    id: new FormControl(''),
    code : new FormControl(''),
    number : new FormControl(''),
    length : new FormControl(''),
    width : new FormControl(''),
    height : new FormControl(''),
    delFlag : new FormControl(''),
    isEmpty : new FormControl(''),
    description : new FormControl('')
  })
  constructor(private dialog: MatDialogRef<UpdateMapParkingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mapParkingService: MapParkingService,
              private snackBar: MatSnackBar,
              private active: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.mapParkingService.getAllLocation(0).subscribe((data: any) => {
      this.locationList = data.content;
    })
  }


  // updateMapParking() {
  //   this.mapParkingService.updateColorLocation(Number(this.active.snapshot.paramMap.get('id')), this.formUpdate.value).subscribe(() => {
  //     this.dialog.close()
  //     this.snackBar.open('Đã đặt thành công vị trí', 'OK', {
  //       duration:2000
  //     });
  //   })
  //   this.ngOnInit();
  // }
}
