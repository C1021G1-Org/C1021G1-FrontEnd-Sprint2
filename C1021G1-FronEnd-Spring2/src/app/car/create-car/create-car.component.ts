import {Component, Inject, OnInit} from '@angular/core';
import {CarType} from "../model/car-type";
import {CarService} from "../car.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../model/car";
import {CustomerService} from "../../customer/customer.service";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  createCarForm = new FormGroup({
    name: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*$/),
      Validators.maxLength(40),
      Validators.minLength(5)]),
    carPlate: new FormControl('', [Validators.required,
      Validators.pattern(/^([0-9]{2})+([A-Z])+([-])+([0-9]{3})+([0-9]{2})$/)]),
    carCompany: new FormControl('', [Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)]),
    customer: new FormControl(''),
    carType: new FormControl('', Validators.required),

  });
  carTypeList: CarType[];
  car: Car[];
  id;
  idCustomer;


  constructor(private carService: CarService,
              private customerService: CustomerService,
              private dialogRef: MatDialogRef<CreateCarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.idCustomer = this.data
    console.log("Id khách hàng :" + this.idCustomer)
    this.createCarForm.patchValue({customer: this.data})
  }

  ngOnInit(): void {
    this.getCarType();
  }


  createCar() {
    console.log(this.data)
    console.log(this.createCarForm.value)
    // this.createCarForm.get('customer').setValue(this.idCustomer);
    console.log(this.createCarForm.get('customer').value)
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
