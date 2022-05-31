export class Customer {
  private _id:number;
  private _code:string;
  private _name:string;
  private _birthday:string;
  private _idCard:string;
  private _email:string;
  private _phone:string;
  private _address:string;
  private _gender:boolean;
  private _delFlag:boolean;
  private _account:any;
  private _ward:any;


  constructor() {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get birthday(): string {
    return this._birthday;
  }

  set birthday(value: string) {
    this._birthday = value;
  }

  get idCard(): string {
    return this._idCard;
  }

  set idCard(value: string) {
    this._idCard = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get gender(): boolean {
    return this._gender;
  }

  set gender(value: boolean) {
    this._gender = value;
  }

  get delFlag(): boolean {
    return this._delFlag;
  }

  set delFlag(value: boolean) {
    this._delFlag = value;
  }

  get account(): any {
    return this._account;
  }

  set account(value: any) {
    this._account = value;
  }

  get ward(): any {
    return this._ward;
  }

  set ward(value: any) {
    this._ward = value;
  }
}
