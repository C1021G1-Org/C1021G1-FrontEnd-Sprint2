import {Car} from "../../car/model/car";

export interface Customer {
  id:number;
  code:string;
  name:string;
  birthday:string;
  idCard:string;
  email:string;
  phone:string;
  address:string;
  gender:boolean;
  delFlag:boolean;
  car:Car;

}
