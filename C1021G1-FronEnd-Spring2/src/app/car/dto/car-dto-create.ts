import {CarType} from "../model/car-type";
import {Customer} from "../../customer/model/customer";

export interface CarDtoCreate {
  id? : number,
  name?: string,
  carPlate? : string,
  carCompany? : string,
  customer? : number,
  carType? : number,
}
