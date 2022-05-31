import {Customer} from "../../customer/model/customer";
import {CarType} from "./car-type";

export interface Car {
<<<<<<< HEAD
  id? : number,
  code?: string,
  name?: string,
  carCompany? : string,
  carPlate? : string,
  delFlag? : boolean,
  carType? : CarType
  customer? : Customer
=======
  id:number;
  code:string;
  name:string;
  carPlate:string;
  carCompany:string;
  delFlag:boolean;
  customer: Customer
  carType:CarType;
>>>>>>> c2fec8f292eb1432818e7b50562da20f52758d1d
}
