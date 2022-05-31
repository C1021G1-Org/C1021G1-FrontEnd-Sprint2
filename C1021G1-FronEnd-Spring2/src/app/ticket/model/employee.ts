import {Car} from "./car";

export class Employee {
  private _id: number;
  private _code: string;
  private _name: string;
  private _birthday: string;
  private _gender: boolean;
  private _address: string;
  private _delFlag: string;
  private _ward: any;
  private _position: any;
  private _account: any;


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

  get gender(): boolean {
    return this._gender;
  }

  set gender(value: boolean) {
    this._gender = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get delFlag(): string {
    return this._delFlag;
  }

  set delFlag(value: string) {
    this._delFlag = value;
  }

  get ward(): any {
    return this._ward;
  }

  set ward(value: any) {
    this._ward = value;
  }

  get position(): any {
    return this._position;
  }

  set position(value: any) {
    this._position = value;
  }

  get account(): any {
    return this._account;
  }

  set account(value: any) {
    this._account = value;
  }
}
