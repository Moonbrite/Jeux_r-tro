import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AddGameFormComponent} from './components/add-game-form/add-game-form.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add/game', component: AddGameFormComponent}
];
