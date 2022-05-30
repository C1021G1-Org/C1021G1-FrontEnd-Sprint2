import {Ticket} from "./ticket";
import {Floor} from "./floor";

export interface Location {
  id: number;
  code: string;
  number: number;
  length: number;
  width: number;
  height: number;
  delFlag: boolean;
  isEmpty: boolean;
  description: string;
  allowedCarParkingSet: any;
  floor: Floor;
}
