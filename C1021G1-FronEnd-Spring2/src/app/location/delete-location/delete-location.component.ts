import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocationService} from '../location.service';

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html',
  styleUrls: ["./delete-location.component.css"]
})
export class DeleteLocationComponent implements OnInit {


  id: any;
  code: any = '';
  floorName: any = '';

  constructor(private dialogRef: MatDialogRef<DeleteLocationComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              public snackBar: MatSnackBar,
              private locationService: LocationService,) { }

  ngOnInit(): void {
    this.code = this.data.datal.code;
    this.floorName=this.data.datal.floor.name;
    console.log(this.data.datal);
    this.id = this.data.datal.id;
  }
  onNoClick(){
    this.dialogRef.close();

  }
  deleteLocation(){
    this.locationService.DeleteLocationById(this.id).subscribe(()=>{
      this.snackBar.open("Xóa Thành công!",'ok',{
        duration:2000
      })
      this.dialogRef.close();

    },error => {
      this.snackBar.open("đang có người ở vị trí này nên không xóa được!",'error',{
        duration:2000
      })
      this.dialogRef.close();
    })
  }


}
