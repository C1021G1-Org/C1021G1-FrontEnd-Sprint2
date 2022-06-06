import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarType} from "../model/car-type";
import {Car} from "../model/car";
import {CarService} from "../car.service";
import {CustomerService} from "../../customer/customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-customer-null',
  templateUrl: './create-customer-null.component.html',
  styleUrls: ['./create-customer-null.component.css']
})
export class CreateCustomerNullComponent implements OnInit {

  createCarForm = new FormGroup({
    name: new FormControl('', [Validators.required,
      Validators.maxLength(40),
      Validators.minLength(2)]),
    carPlate: new FormControl('', [Validators.required,
      Validators.pattern(/^([0-9]{2})+([A-Z])+([-])+([0-9]{3})+([0-9]{2})$/)]),
    carCompany: new FormControl('', [Validators.required,
      Validators.maxLength(40),
      Validators.minLength(2),
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*$/)
    ]),
    carType: new FormControl('', Validators.required),
  });
  carTypeList: CarType[];
  car: Car[];
  id;

  constructor(private carService: CarService,
              private customerService: CustomerService,
              private dialogRef: MatDialogRef<CreateCustomerNullComponent>,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(123)
    this.getCarType();
  }


  createCar() {
    console.log(this.createCarForm.value)
    console.log(this.createCarForm);
    if (!this.createCarForm.invalid) {
      this.carService.createCar(this.createCarForm.value).subscribe( data => {
        console.log(data)
        this.snackBar.open('Thêm mới thông tin xe thành công!', '', {
          duration: 2000
        });
        this.dialogRef.close();
      }, error => {
        console.log(error)
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getCarType() {
    this.carService.getListCarType().subscribe(data => {
      this.carTypeList = data;
      console.log(this.carTypeList)
    }, error => {
      console.log(error)
    })
  }
}
