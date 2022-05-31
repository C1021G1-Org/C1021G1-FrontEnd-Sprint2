import {Customer} from "../../customer/model/customer";
import {CarType} from "./car-type";

export interface Car {
  id:number;
  code:string;
  name:string;
  carPlate:string;
  carCompany:string;
  delFlag:boolean;
  customer: Customer
  carType:CarType;
}
