import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ManageGameComponent} from './components/manage-game/manage-game.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add/game', component: ManageGameComponent},
  {path: 'game/:id', component: ManageGameComponent}
];
