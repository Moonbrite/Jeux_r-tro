import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {Game} from '../../models/game';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {GameService} from '../../services/game';

@Component({
  selector: 'app-add-game-form',
  imports: [
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatLabel,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    NgForOf,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './add-game-form.component.html',
  standalone: true,
  styleUrl: './add-game-form.component.scss'
})
export class AddGameFormComponent {

  gameForm: FormGroup;
  platforms: string[] = ['Nintendo Switch', 'PlayStation 4', 'Xbox One', 'PC'];
  genres: string[] = ['Aventure', 'RPG', 'Sport', 'Simulation', 'Shooter'];
  boxConditions: string[] = ['Neuf','Excellent','Bon','Usé']
  game: Game = new Game();


  constructor(private formBuilder: FormBuilder, private gameService: GameService) {
    this.gameForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      developer: [''],
      publisher: [''],
      release_year: [null, [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      box_condition: ['Neuf', [Validators.required]],
      cartridge_condition: ['Neuf', [Validators.required]],
      purchase_price: [null, [Validators.required, Validators.min(0)]],
      collection: [false]
    });
  }

  submitForm() {

    if (this.gameForm.valid) {
      this.game = this.gameForm.value;
      this.gameService.post(this.game).subscribe({
        next: data => {
          console.log("Le jeux a bien etait ajouter", data);
          window.alert(`Le jeux a bien etait ajouter: ${data.title}`);
        },
        error: (err) => {
          console.log(err)
        },
      })
    }

  }


}
