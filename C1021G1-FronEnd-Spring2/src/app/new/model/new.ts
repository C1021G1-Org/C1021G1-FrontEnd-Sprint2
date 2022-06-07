class INewsType {
  id:number;
  name:string
}

export interface New {
  id : number;
  code: String; // auto increase
  author: String;
  title: String
  date: String; // handleSet
  description: String;
  img: File //fireBase
  delFlag: boolean // handleSet false
  newsType: INewsType;
}
