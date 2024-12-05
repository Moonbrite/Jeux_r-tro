export class Game {
  _id: string;
  title: string;
  platform: string;
  genre: string;
  developer: string;
  publisher: string;
  release_year: number;
  box_condition: string;
  cartridge_condition: string;
  purchase_price: number;
  collection: boolean;

  constructor(
    _id: string,
    title: string,
    platform: string,
    genre: string,
    developer: string,
    publisher: string,
    release_year: number,
    box_condition: string,
    cartridge_condition: string,
    purchase_price: number,
    collection: boolean
  ) {
    this._id = _id;
    this.title = title;
    this.platform = platform;
    this.genre = genre;
    this.developer = developer;
    this.publisher = publisher;
    this.release_year = release_year;
    this.box_condition = box_condition;
    this.cartridge_condition = cartridge_condition;
    this.purchase_price = purchase_price;
    this.collection = collection;
  }
}
