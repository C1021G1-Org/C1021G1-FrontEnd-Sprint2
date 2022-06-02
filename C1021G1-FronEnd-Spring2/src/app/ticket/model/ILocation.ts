import {Floor} from "./floor";

export interface ILocation {
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
