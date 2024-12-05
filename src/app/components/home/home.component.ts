import { Component } from '@angular/core';
import {ListGameComponent} from '../blocks/list-game/list-game.component';

@Component({
  selector: 'app-home',
  imports: [
    ListGameComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
