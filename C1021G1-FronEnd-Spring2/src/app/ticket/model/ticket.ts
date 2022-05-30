import {TicketType} from "./ticketType";
import {Location} from "./location";
import {Car} from "./car";

export interface Ticket {
  id: number;
  code: string;
  startDate: string;
  endDate: string;
  imgCarIn: string;
  imgCarOut: string;
  timeIn: string;
  timeOut: string;
  delFlag: boolean
  isDoing: boolean;
  sumPrice: number;
  ticketType: TicketType;
  location: Location;
  car: Car;
}
