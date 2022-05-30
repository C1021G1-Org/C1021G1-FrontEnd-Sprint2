import {Ticket} from "./ticket";
import {Employee} from "./employee";
import {Customer} from "./customer";
import {CarType} from "./carType";

export interface Car {
  id: number;
  code: string;
  name: string;
  carPlate: string;
  carCompany: string;
  delFlag: boolean;
  customer: Customer;
  ticket: Ticket;
  employee: Employee;
  carType: CarType;
}
