import { Component } from '@angular/core';
import {ListGameComponent} from '../blocks/list-game/list-game.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ListGameComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
