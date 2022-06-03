
import {Customer} from "./customer";
import {CarType} from "./car-type";
import {Employee} from "./employee";

export interface ICar {
  id: number;
  code: string;
  name: string;
  carPlate: string;
  carCompany: string;
  delFlag: boolean;
  customer: Customer;
  employee: Employee;
  carType: CarType

}
