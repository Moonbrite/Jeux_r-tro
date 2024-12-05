import {Component, OnInit} from '@angular/core';
import {Game} from '../../../models/game';
import {GameService} from '../../../services/game';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-game',
  imports: [
    NgForOf,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './list-game.component.html',
  standalone: true,
  styleUrl: './list-game.component.scss'
})
export class ListGameComponent implements OnInit {

  constructor(private gameService:GameService) {
  }

  games:Game [] = []

  ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next: (data)=> { this.games = data; console.log(this.games) },
      error: (err)=> {console.log(err)},
    })
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
}
