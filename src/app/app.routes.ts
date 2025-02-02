import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ManageGameComponent} from './components/manage-game/manage-game.component';
import {RatingCommentComponent} from './components/rating-comment/rating-comment.component';
import {ManageEventComponent} from './components/manage-event/manage-event.component';
import {ManageLoanComponent} from './components/manage-loan/manage-loan.component';
import {ListEventComponent} from './components/blocks/list-event/list-event.component';
import {ListGameComponent} from './components/blocks/list-game/list-game.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add/game', component: ManageGameComponent},
  {path: 'add/event', component: ManageEventComponent},
  {path: 'game/:id', component: ManageGameComponent},
  {path: 'game/rating/:id', component: RatingCommentComponent},
  {path: 'game/loan/:id', component: ManageLoanComponent},
  {path: 'event', component: ListEventComponent},
  {path: 'game', component: ListGameComponent},
];
