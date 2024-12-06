import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environnement} from '../environement/environement';
import {Game} from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient:HttpClient,) {

  }

  apiUrl: string = environnement.apiUrl+"games";


  getAll(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.apiUrl)
  }
  get(id:string): Observable<any> {
    return this.httpClient.get<Game>(this.apiUrl+ "/" +id)
  }
  delete(id:string):Observable<Game> {
   return  this.httpClient.delete<Game>(this.apiUrl+"/" +id)
  }
  edit(id: string, game: Game): Observable<Game> {
    return this.httpClient.put<Game>(this.apiUrl+"/" +id, game, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateGame(game: Game): Observable<Game> {
    return this.httpClient.put<Game>(this.apiUrl+"/"+game.id, game);
  }

  post(game: Game | undefined):Observable<Game> {
   return this.httpClient.post<Game>(this.apiUrl,game)
  }


}
