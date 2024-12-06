import {Comment} from './comment';
import {Event} from './event';
import {Loan} from './loan';


export class Game {
  id?: string;
  title?: string;
  platform?: string;
  genre?: string;
  developer?: string;
  publisher?: string;
  release_year?: number;
  box_condition?: string;
  cartridge_condition?: string;
  purchase_price?: number;
  collection?: boolean;
  favorites?: boolean;
  tags?: string[];
  rating?: number;
  comments?: Comment[];
  events?: Event[];
  loan_history?: Loan[];
  status?: string;

  constructor(
    id?: string,
    title?: string,
    platform?: string,
    genre?: string,
    developer?: string,
    publisher?: string,
    release_year?: number,
    box_condition?: string,
    cartridge_condition?: string,
    purchase_price?: number,
    collection?: boolean,
    favorites?: boolean,
    tags?: string[],
    rating?: number,
    comments?: Comment[],
    events?: Event[],
    loan_history?: Loan[],
    status?: string
  ) {
    this.id = id;
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
    this.favorites = favorites;
    this.tags = tags;
    this.rating = rating;
    this.comments = comments;
    this.events = events;
    this.loan_history = loan_history;
    this.status = status;
  }
}
