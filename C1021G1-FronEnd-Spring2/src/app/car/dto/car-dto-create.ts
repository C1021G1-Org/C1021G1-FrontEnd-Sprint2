import {CarType} from "../model/car-type";
import {Customer} from "../../customer/model/customer";

export interface CarDtoCreate {

  id? : number,
  code?: string,
  name?: string,
  carCompany? : string,
  carPlate? : string,
  delFlag? : boolean,
  carType? : number
  customer? : number
}
