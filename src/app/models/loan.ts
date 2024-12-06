export class Loan {
  borrower_name: string; 
  loan_date: string;
  return_date: string;
  comment: string;

  constructor(borrower_name: string, loan_date: string, return_date: string, comment: string) {
    this.borrower_name = borrower_name;
    this.loan_date = loan_date;
    this.return_date = return_date;
    this.comment = comment;
  }
}
