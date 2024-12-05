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
  get(id:string): Observable<Game> {
    return this.httpClient.get<Game>(this.apiUrl+ "/" +id)
  }


  post(game:Game):Observable<Game> {
   return this.httpClient.post<Game>(this.apiUrl,game)
  }


}
