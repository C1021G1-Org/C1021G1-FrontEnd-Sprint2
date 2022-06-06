import {INewsType} from "../model/i-news-type";
import * as buffer from "buffer";


export interface INewsDto {
  id ?: number;
  code?: String; // auto increase
  author?: String;
  title?: String
  date?: String; // handleSet
  description?: String;
  img?: String//fireBase
  delFlag?: boolean // handleSet false
  newsType?: INewsType;
}
