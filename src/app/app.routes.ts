import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ManageGameComponent} from './components/manage-game/manage-game.component';
import {RatingCommentComponent} from './components/rating-comment/rating-comment.component';
import {ManageEventComponent} from './components/manage-event/manage-event.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add/game', component: ManageGameComponent},
  {path: 'add/event', component: ManageEventComponent},
  {path: 'game/:id', component: ManageGameComponent},
  {path: 'game/rating/:id', component: RatingCommentComponent}
];
