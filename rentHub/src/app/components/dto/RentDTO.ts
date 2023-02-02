export class RentDTO{
  private _RitemTitle: string;
  private _RitemLocation: string;
  private _RitemPrice: string;
  private _RitemDesc : string;
  private _RitemImg : string;
  private _username: string;

  constructor(RitemTitle: string, RitemLocation: string, RitemPrice: string, RitemDesc: string, RitemImg: string, username: string) {
    this._RitemTitle = RitemTitle;
    this._RitemLocation = RitemLocation;
    this._RitemPrice = RitemPrice;
    this._RitemDesc = RitemDesc;
    this._RitemImg = RitemImg;
    this._username = username;
  }

  get RitemTitle(): string {
    return this._RitemTitle;
  }

  set RitemTitle(value: string) {
    this._RitemTitle = value;
  }

  get RitemLocation(): string {
    return this._RitemLocation;
  }

  set RitemLocation(value: string) {
    this._RitemLocation = value;
  }

  get RitemPrice(): string {
    return this._RitemPrice;
  }

  set RitemPrice(value: string) {
    this._RitemPrice = value;
  }

  get RitemDesc(): string {
    return this._RitemDesc;
  }

  set RitemDesc(value: string) {
    this._RitemDesc = value;
  }

  get RitemImg(): string {
    return this._RitemImg;
  }

  set RitemImg(value: string) {
    this._RitemImg = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
