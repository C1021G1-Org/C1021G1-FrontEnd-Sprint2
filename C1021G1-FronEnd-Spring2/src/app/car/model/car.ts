import {Customer} from "../../customer/model/customer";
import {CarType} from "./car-type";

export interface Car {

  id? : number,
  code?: string,
  name?: string,
  carCompany? : string,
  carPlate? : string,
  delFlag? : boolean,
  carType? : CarType
  customer? : Customer

}
