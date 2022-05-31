import {Floor} from "./floor";

export class ILocation {
  private _id: number;
  private _code: string;
  private _number: number;
  private _length: number;
  private _width: number;
  private _height: number;
  private _delFlag: boolean;
  private _isEmpty: boolean;
  private _description: string;
  private _allowedCarParkingSet: any;
  private _floor: Floor;

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

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get delFlag(): boolean {
    return this._delFlag;
  }

  set delFlag(value: boolean) {
    this._delFlag = value;
  }

  get isEmpty(): boolean {
    return this._isEmpty;
  }

  set isEmpty(value: boolean) {
    this._isEmpty = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get allowedCarParkingSet(): any {
    return this._allowedCarParkingSet;
  }

  set allowedCarParkingSet(value: any) {
    this._allowedCarParkingSet = value;
  }

  get floor(): Floor {
    return this._floor;
  }

  set floor(value: Floor) {
    this._floor = value;
  }
}
