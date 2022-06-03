import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Customer} from "../model/customer";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  customerID : number;
  id: any;
  customer : Customer;


  constructor(private dialogRef : MatDialogRef<DeleteCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService : CustomerService,
              private snackBar : MatSnackBar) {
    console.log('data la ' + data.datal);
    this.customerID = data.datal;

  }

  ngOnInit(): void {
    this.id = this.data.datal;
    this.customerService.checkCustomerId(this.id).subscribe(data1 =>{
      console.log('data la ' + data1);
      this.customer = data1;
      console.log(this.customer)
    })
  }

  delete(){
    this.customerService.deleteCustomer(this.id).subscribe(next =>{
      console.log('da gui id detele')
      this.dialogRef.close()
      this.snackBar.open('da xoa thanh cong', 'ok', {
        duration: 3000
      })
    }, error => {
      console.log('that bai')
    })
  }

  close(){
    this.dialogRef.close()
  }

}
