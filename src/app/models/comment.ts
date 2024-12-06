export class Comment {
  author: string;
  comment: string;
  date: number;
  game_id:string;
  rating: number;

  constructor(author: string, comment: string, date: number, game_id: string,rating: number) {
    this.author = author;
    this.comment = comment;
    this.date = date;
    this.game_id = game_id;
    this.rating = rating;
  }
}
