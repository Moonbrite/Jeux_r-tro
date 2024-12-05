import {Component, OnInit} from '@angular/core';
import {Game} from '../../../models/game';
import {GameService} from '../../../services/game';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-list-game',
  imports: [
    NgForOf,
    CurrencyPipe
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

}
