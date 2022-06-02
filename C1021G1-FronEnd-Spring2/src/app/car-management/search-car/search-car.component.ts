import { Component, OnInit } from '@angular/core';
import {CarManagementService} from '../car-management.service';
import {CarTicket} from '../../dto/CarTicket';
import {FormControl, FormGroup} from '@angular/forms';
import {CarChoose} from '../../dto/CarChoose';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {
  check : boolean = false;
  carTicket : CarTicket[];
  carChoose : CarChoose[];
  formGroup: FormGroup ;

  constructor( private carService: CarManagementService , private router : Router) { }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
        carPlate: new FormControl(''),
        customerName: new FormControl(''),
        phoneNumber: new FormControl('')
    })
  }

  searchCar(customerName: string, phoneNumber: string,carPlate: string) {
    return this.carService.findCar( customerName.trim() , phoneNumber.trim(),carPlate.trim()).subscribe( data => {
      this.carTicket = data;
      console.log(this.carTicket);
    })
  }

  chooseCar(carPlate: string) {

    return this.carService.chooseCar(carPlate).subscribe((data) => {
      this.carChoose = data;
      if(data.length > 0) {
        this.carService.currentTicket = data[0];
      }else{
        this.router.navigateByUrl('customer')
      }
  }
}
