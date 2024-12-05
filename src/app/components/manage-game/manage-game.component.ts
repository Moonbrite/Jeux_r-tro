import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../models/game';
import {GameService} from '../../services/game';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-manage-game',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatError,
    MatCardContent,
    MatCardTitle,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    MatIcon,
    NgIf,
    MatCardHeader
  ],
  templateUrl: './manage-game.component.html',
  standalone: true,
  styleUrl: './manage-game.component.scss'
})
export class ManageGameComponent implements OnInit {

  gameForm: FormGroup;
  isEditMode = false;
  gameId: string | null = null;

  platforms: string[] = ['Nintendo Switch', 'PlayStation 4', 'Xbox One', 'PC'];
  genres: string[] = ['Aventure', 'RPG', 'Sport', 'Simulation', 'Shooter'];
  boxConditions: string[] = ['Neuf', 'Excellent', 'Bon', 'Usé'];

  game?: Game;

  currentYear = new Date().getFullYear();


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private _snackBar: MatSnackBar,
  ) {
    this.gameForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      developer: [''],
      publisher: [''],
      release_year: [null, [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      box_condition: ['', [Validators.required]],
      cartridge_condition: ['', [Validators.required]],
      purchase_price: [null, [Validators.required, Validators.min(0)]],
      collection: [false]
    });
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.gameId;

    if (this.isEditMode) {
      this.loadGame(this.gameId);
    }
  }

  loadGame(id: string | null): void {
    if (id) {
      this.gameService.get(id).subscribe({
        next: data => {
          this.game = data;
          this.gameForm.patchValue(this.game)
        }
      })
    }
  }

  submitForm(): void {
    if (this.gameForm.valid) {
      this.game = this.gameForm.value;
      if (this.isEditMode && this.gameId && this.game) {
        this.gameService.edit(this.gameId, this.game).subscribe({
          next: data => {
            this._snackBar.open("Le jeu a bien était modifier",
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
            console.log(err)
          },
        })
      } else {
        this.gameService.post(this.game).subscribe({
          next: data => {
            this._snackBar.open("Le jeu à bien ajouter"
              , "Fermer",
              {
                duration: 3000,
                horizontalPosition: 'left',
                verticalPosition: 'top',
              });
            this.router.navigate(['']);
          },
          error: (err) => {
            console.log(err)
          },
        })
      }
      this.router.navigate(['']);
    }
  }

}
