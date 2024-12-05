import {Component, OnInit} from '@angular/core';
import {Game} from '../../../models/game';
import {GameService} from '../../../services/game';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-game',
  imports: [
    NgForOf,
    CurrencyPipe,
    RouterLink,
    NgIf,
    FormsModule,
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


  ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next: (data) => {
        this.games = data;
        this.filteredGames = [...this.games];
        this.selectedPrice = 0;
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
          this.filteredGames.splice(this.filteredGames.indexOf(<Game>this.games.find(game => game.id == id)), 1);
        },
        error: (err)=> {console.log(err)},
      })
    }
  }

  resetFilters(): void {
    this.selectedPlatform = null;
    this.selectedGenre = null;
    this.selectedBoxCondition = null;
    this.selectedPrice = null;
    this.filteredGames = [...this.games];
  }


  applyFilters(): void {
    this.filteredGames = this.games.filter((game) => {
      const matchesPlatform = this.selectedPlatform ? game.platform === this.selectedPlatform : true;
      const matchesGenre = this.selectedGenre ? game.genre === this.selectedGenre : true;
      const matchesBoxCondition = this.selectedBoxCondition ? game.box_condition === this.selectedBoxCondition : true;
      // @ts-ignore
      const matchesPrice = this.selectedPrice !== null ? game.purchase_price <= this.selectedPrice : true;

      return matchesPlatform && matchesGenre && matchesBoxCondition && matchesPrice;
    });
  }



}
