export class Loan {
  borrower_name: string;
  game_id: string;
  loan_date: string;
  return_date: string;
  comment: string;

  constructor(borrower_name: string,game_id:string, loan_date: string, return_date: string, comment: string) {
    this.borrower_name = borrower_name;
    this.game_id = game_id;
    this.loan_date = loan_date;
    this.return_date = return_date;
    this.comment = comment;
  }
}
