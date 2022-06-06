
import {TicketType} from "./ticket-type";
import {ICar} from "./ICar";
import {ILocation} from "./ILocation";

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
  location: ILocation
  car: ICar;
  flagExpire: boolean;


}
