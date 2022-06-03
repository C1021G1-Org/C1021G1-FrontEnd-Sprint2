import {Component, OnInit} from '@angular/core';
import {Ward} from "../model/ward";
import {District} from "../model/district";
import {Province} from "../model/province";
import {Customer} from "../model/customer";
import {CustomerService} from "../customer.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AbstractControl, FormControl, FormGroup, FormGroupName, Validators} from "@angular/forms";
import {Car} from "../../car/model/car";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateCarComponent} from "../../car/create-car/create-car.component";
import {log} from "util";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  wardList: Ward[];
  districts: District[];
  provinces: Province[];
  wards: any;
  idCustomer;
  car: Car[];
  any;

  constructor(private customerService: CustomerService,
              private router: Router,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.customerService.getListWard().subscribe(data => {
      this.wardList = data
      console.log(data)
    })
    this.customerService.getListDistrict().subscribe(data => {
      this.districts = data;
      console.log(data)
    })
    this.customerService.getListProvince().subscribe(data => {
      this.provinces = data;
      console.log(data)
    })


    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.idCustomer = data.get('id');
      this.customerService.getInfo(this.idCustomer).subscribe(value => {
        this.car = value;
        console.log(this.car)
        this.editCustomerForm.patchValue(this.car[0].customer);
        this.editCustomerForm.patchValue({'ward' : this.car[0].customer.ward.id})
        console.log(this.car[0].customer.ward);
        this.wards = this.car[0].customer.ward;
        this.idCustomer = this.car[0].customer.id;

      })
    });


  }

  editCustomerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required,
      Validators.pattern(/^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+(\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+)*$/),
      Validators.maxLength(40),
      Validators.minLength(5)]),
    birthday: new FormControl('', [Validators.required, this.checkAge]),
    idCard: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{9,12})$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^((03)|(08)|(07)|(09))([0-9]){8}$/)]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    ward: new FormControl('',Validators.required)
  })


  updateCustomer() {
    // this.editCustomerForm.patchValue({ward: this.editCustomerForm.get('ward').value.id});
    console.log(this.editCustomerForm.get('ward').value.id);
    // console.log(this.editCustomerForm.value)
    if (!this.editCustomerForm.invalid) {
      this.customerService.updateCustomerDto(this.idCustomer, this.editCustomerForm.value).subscribe(data => {
        console.log(data)
        this.snackBar.open('Chỉnh sửa thông tin khách hàng thành công!', '', {
          duration: 2000
        });
        this.router.navigateByUrl("/list")
      }, error => {
        console.log(error)
      })
    }
  }

  checkAge(birthday: AbstractControl) {
    const birth = new Date(birthday.value);
    const date = Date.now() - birth.getTime() - 86400000;
    const time = new Date(date);
    const age = time.getUTCFullYear() - 1970;
    if (age < 18) {
      return {'ageUnder': true};
    }
    return null;
  }

  getDistrictById(id: number) {
    this.customerService.getDistrict(id).subscribe(data => {
      this.districts = data;
    })
  }

  getWardById(id: number) {
    this.customerService.getWard(id).subscribe(data => {
      this.wardList = data;
    })
  }

  openDialog() {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.idCustomer = data.get('id');
      this.customerService.getInfo(this.idCustomer).subscribe(value => {
        this.car = value;
        this.editCustomerForm.patchValue(this.car[0].customer);
        this.wards = this.car[0].customer.ward;
        this.idCustomer = this.car[0].customer.id;
        const dialogRef = this.matDialog.open(CreateCarComponent, {
          width: "500px",
          data: this.idCustomer
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      })
    });

  }

}
