import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validator personnalisé : Vérifie si la date de retour est supérieure à la date de prêt
export function validateReturnDate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const loanDate = control.get('loan_date')?.value;
    const returnDate = control.get('return_date')?.value;

    if (loanDate && returnDate && new Date(returnDate) <= new Date(loanDate)) {
      return { invalidReturnDate: true };
    }
    return null;
  };
}
