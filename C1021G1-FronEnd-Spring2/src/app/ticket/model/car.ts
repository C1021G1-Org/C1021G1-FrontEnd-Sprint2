import {Ticket} from "./ticket";
import {Employee} from "./employee";
import {Customer} from "./customer";
import {CarType} from "./carType";

export class Car {
  private _id: number;
  private _code: string;
  private _name: string;
  private _carPlate: string;
  private _carCompany: string;
  private _delFlag: boolean;
  private _customer: Customer;
  private _employee: Employee;
  private _carType: CarType;


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

  get carPlate(): string {
    return this._carPlate;
  }

  set carPlate(value: string) {
    this._carPlate = value;
  }

  get carCompany(): string {
    return this._carCompany;
  }

  set carCompany(value: string) {
    this._carCompany = value;
  }

  get delFlag(): boolean {
    return this._delFlag;
  }

  set delFlag(value: boolean) {
    this._delFlag = value;
  }

  get customer(): Customer {
    return this._customer;
  }

  set customer(value: Customer) {
    this._customer = value;
  }

  get employee(): Employee {
    return this._employee;
  }

  set employee(value: Employee) {
    this._employee = value;
  }

  get carType(): CarType {
    return this._carType;
  }

  set carType(value: CarType) {
    this._carType = value;
  }
}
