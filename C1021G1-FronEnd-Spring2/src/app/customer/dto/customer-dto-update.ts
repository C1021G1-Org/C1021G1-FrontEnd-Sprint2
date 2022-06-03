import {Ward} from "../model/ward";


export interface CustomerDtoUpdate {
  id? : number,
  name? : string,
  birthday? : string,
  idCard? : string,
  email? : string,
  phone? : string,
  address? : string,
  gender? : Boolean,
  ward? : number
}
