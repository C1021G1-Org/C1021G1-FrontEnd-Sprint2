import {TicketType} from "./ticketType";
import {ILocation} from "./ilocation";
import {Car} from "./car";

export class Ticket {
  private _id: number;
  private _code: string;
  private _startDate: string;
  private _endDate: string;
  private _imgCarIn: string;
  private _imgCarOut: string;
  private _timeIn: string;
  private _timeOut: string;
  private _delFlag: boolean
  private _isDoing: boolean;
  private _sumPrice: number;
  private _ticketType: TicketType;
  private _location: ILocation;
  private _car: Car;


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

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
    this._endDate = value;
  }

  get imgCarIn(): string {
    return this._imgCarIn;
  }

  set imgCarIn(value: string) {
    this._imgCarIn = value;
  }

  get imgCarOut(): string {
    return this._imgCarOut;
  }

  set imgCarOut(value: string) {
    this._imgCarOut = value;
  }

  get timeIn(): string {
    return this._timeIn;
  }

  set timeIn(value: string) {
    this._timeIn = value;
  }

  get timeOut(): string {
    return this._timeOut;
  }

  set timeOut(value: string) {
    this._timeOut = value;
  }

  get delFlag(): boolean {
    return this._delFlag;
  }

  set delFlag(value: boolean) {
    this._delFlag = value;
  }

  get isDoing(): boolean {
    return this._isDoing;
  }

  set isDoing(value: boolean) {
    this._isDoing = value;
  }

  get sumPrice(): number {
    return this._sumPrice;
  }

  set sumPrice(value: number) {
    this._sumPrice = value;
  }

  get ticketType(): TicketType {
    return this._ticketType;
  }

  set ticketType(value: TicketType) {
    this._ticketType = value;
  }

  get location(): ILocation {
    return this._location;
  }

  set location(value: ILocation) {
    this._location = value;
  }

  get car(): Car {
    return this._car;
  }

  set car(value: Car) {
    this._car = value;
  }
}
