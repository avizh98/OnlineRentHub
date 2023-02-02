export class ItemDTO{
  private _itemTitle: string;
  private _itemLocation: string;
  private _itemPrice: string;
  private _itemDesc : string;
  private _itemImg : string;

  constructor(itemTitle: string, itemLocation: string, itemPrice: string, itemDesc: string, itemImg: string) {
    this._itemTitle = itemTitle;
    this._itemLocation = itemLocation;
    this._itemPrice = itemPrice;
    this._itemDesc = itemDesc;
    this._itemImg = itemImg;
  }

  get itemTitle(): string {
    return this._itemTitle;
  }

  set itemTitle(value: string) {
    this._itemTitle = value;
  }

  get itemLocation(): string {
    return this._itemLocation;
  }

  set itemLocation(value: string) {
    this._itemLocation = value;
  }

  get itemPrice(): string {
    return this._itemPrice;
  }

  set itemPrice(value: string) {
    this._itemPrice = value;
  }

  get itemDesc(): string {
    return this._itemDesc;
  }

  set itemDesc(value: string) {
    this._itemDesc = value;
  }

  get itemImg(): string {
    return this._itemImg;
  }

  set itemImg(value: string) {
    this._itemImg = value;
  }
}
