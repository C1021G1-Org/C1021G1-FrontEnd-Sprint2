import {Ticket} from "./ticket";

export interface DataPageable {

  content:Ticket[];
  pageable:any;
  totalElements:number;
  last:boolean;
  totalPages:number;
  size:number;
  number:number;
  sort:any;
  numberOfElements:number;
  first:boolean;
  empty:boolean;
}
