import {Component, Inject, OnInit} from '@angular/core';
import {CarManagementService} from '../car-management.service';
import {CarTicket} from '../../dto/CarTicket';
import {FormControl, FormGroup} from '@angular/forms';
import {CarChoose} from '../../dto/CarChoose';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {

  check: boolean = false;
  carTicket: CarTicket[];
  carChoose: CarChoose[];
  formGroup: FormGroup;
  plate: string ;
  constructor(
    private dialog: MatDialogRef<SearchCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarManagementService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.plate = this.carService.plate;
    this.formGroup = new FormGroup({
      carPlate: new FormControl(this.plate),
      customerName: new FormControl(''),
      phoneNumber: new FormControl('')
    });
    this.searchCar('','',this.plate)
  }

  searchCar(customerName: string, phoneNumber: string, carPlate: string) {
    return this.carService.findCar(customerName.trim(), phoneNumber.trim(), carPlate.trim()).subscribe(data => {
      this.carTicket = data;
      console.log(this.carTicket);
    });
  }

  chooseCar(carPlate: string) {
    console.log(carPlate);
    return this.carService.chooseCar(carPlate).subscribe((data) => {
      this.carChoose = data;
        console.log("data");
        console.log(data);
      if (data.length > 0) {
        this.carService.currentTicket = data[0];
        console.log("helo1");
        console.log(this.carService.currentTicket);
      } else {
        this.router.navigateByUrl('customer');
      }
      this.closeDialog();
    },error => {
      console.log("helo3");
      console.log(error);
      }
    )
    ;
  }

  closeDialog() {
    this.dialog.close()
    // this.flightService.deleteFlight(this.id).subscribe(() => {
    //     this.dialog.close()
    //     this.snackBar.open('Đã xóa chuyến bay thành công', 'OK');
    //   },() =>{
    //     this.snackBar.open('Chuyến bay này đã có người đặt, nên không thể xóa được', 'error');
    //   }
    // )
  }
}
