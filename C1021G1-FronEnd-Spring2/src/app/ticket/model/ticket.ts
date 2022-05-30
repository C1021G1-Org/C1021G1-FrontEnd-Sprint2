import {TicketType} from "./ticket-type";
import {Car} from "./car";
import {Location} from "./location";

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
  location: Location
  car: Car;
  flagExpire: boolean;

}
