import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environnement} from '../environement/environement';
import {Event} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient:HttpClient,) {

  }

  apiUrl: string = environnement.apiUrl+"events";

  post(event: Event ):Observable<Event> {
    return this.httpClient.post<Event>(this.apiUrl,event)
  }





}
