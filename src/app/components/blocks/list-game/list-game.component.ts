import {Component, OnInit} from '@angular/core';
import {Game} from '../../../models/game';
import {GameService} from '../../../services/game';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';

@Component({
  selector: 'app-list-game',
  imports: [
    NgForOf,
    CurrencyPipe,
    RouterLink,
    NgIf,
    MatSlider,
    MatSliderThumb
  ],
  templateUrl: './list-game.component.html',
  standalone: true,
  styleUrl: './list-game.component.scss'
})
export class ListGameComponent implements OnInit {

  constructor(private gameService:GameService) {
  }

  games:Game [] = []
  platforms: string[] = ['Nintendo Switch', 'PlayStation 4', 'Xbox One', 'PC'];
  genres: string[] = ['Aventure', 'RPG', 'Sport', 'Simulation', 'Shooter'];
  boxConditions: string[] = ['Neuf', 'Excellent', 'Bon', 'Usé'];

  selectedPlatform: string | null = null;
  selectedGenre: string | null = null;
  selectedBoxCondition: string | null = null;
  selectedPrice: number | null = null;

  filteredGames: Game[] = [];

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '€';
    }
    return `${value}`;
  }

  ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next: (data) => {
        this.games = data;
        this.filteredGames = [...this.games];
        this.selectedPrice = 100; // Valeur par défaut du slider
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  deleteGame(id: string | undefined) {
    if (id){
      this.gameService.delete(id).subscribe({
        next: (data)=> {
          this.games.splice(this.games.indexOf(<Game>this.games.find(game => game.id == id)), 1);
        },
        error: (err)=> {console.log(err)},
      })
    }
  }

  resetFilters(): void {
    this.selectedPlatform = null;
    this.selectedGenre = null;
    this.selectedBoxCondition = null;
    this.filteredGames = [...this.games];
  }


  applyFilters(): void {
    this.filteredGames = this.games.filter(game => {
      const matchesPlatform = this.selectedPlatform ? game.platform === this.selectedPlatform : true;
      const matchesGenre = this.selectedGenre ? game.genre === this.selectedGenre : true;
      const matchesBoxCondition = this.selectedBoxCondition ? game.box_condition === this.selectedBoxCondition : true;
      return matchesPlatform && matchesGenre && matchesBoxCondition ;
    });
  }



}
