import {District} from "./district";
import {Province} from "./province";

export interface Ward {
  id? : number,
  name? : string,
  prefix? : string,
  district? : District,
  province? : Province

}
