import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {LoanService} from '../../services/loan';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Loan} from '../../models/loan';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GameService} from '../../services/game';
import {Game} from '../../models/game';
import {validateReturnDate} from '../../validators/validateReturnDate';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-manage-loan',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatCardTitle,
    MatLabel,
    MatError,
    DatePipe,
    NgForOf,
    MatButton
  ],
  templateUrl: './manage-loan.component.html',
  standalone: true,
  styleUrl: './manage-loan.component.scss'
})



export class ManageLoanComponent implements OnInit {

  loanForm: FormGroup;
  gameId: string | null = null;
  game?: Game;
  isLoad: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loanService: LoanService,
    private gameService:GameService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.loanForm = this.formBuilder.group({
      borrower_name: ['', [Validators.required]],
      loan_date: ['', [Validators.required]],
      return_date: ['', [Validators.required]],
      comment: ['']
    },
      { validators: validateReturnDate() }
    );
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');

    this.gameService.get(this.gameId).subscribe({
      next: (data: Game) => {
        this.game = data;
      },
      error: error => {console.log(error);}
    })
  }

  submitLoan(): void {
    if (this.loanForm.valid) {

      if (this.game?.status === 'emprunté') {
        this.isLoad = true;
        console.error('Le jeu est déjà emprunté');
        return;
      }

      if (this.gameId) {
        const loanData = this.loanForm.value;
        const newLoan = new Loan(
          loanData.borrower_name,
          this.gameId,
          loanData.loan_date,
          loanData.return_date,
          loanData.comment
        );

        this.loanService.post(newLoan).subscribe({
          next: (data: Loan) => {

            if (this.game) {
              this.game?.loans?.push(data) ;
              this.game.status = 'emprunté';
              this.saveGame(this.game);
            }
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du prêt :', err);
          }
        });
      }
    }
  }

  saveGame(game: Game): void {
    this.gameService.updateGame(game).subscribe({
      next: (updatedGame) => {
        this._snackBar.open("Le prêt a bien était ajouter",
          "Fermer",
          {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'top',
          }
        );
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du jeu :', err);
      }
    });
  }



}
