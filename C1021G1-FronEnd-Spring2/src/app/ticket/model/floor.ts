export class Floor {
  private _id: number;
  private _name: string;
  private _delFlag: boolean;


  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get delFlag(): boolean {
    return this._delFlag;
  }

  set delFlag(value: boolean) {
    this._delFlag = value;
  }
}
