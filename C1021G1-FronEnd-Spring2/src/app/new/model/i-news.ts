import {INewsType} from "./i-news-type";

export interface INews {
  id ?: number;
  code?: String;
  author?: String;
  title?: String
  date?: String;
  description?: String;
  img?: String
  delFlag?: boolean
  newsType?: INewsType
}
