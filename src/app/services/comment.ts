import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environnement} from '../environement/environement';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient,) {

  }

  apiUrl: string = environnement.apiUrl+"comments";

  post(comment: Comment | undefined):Observable<Comment> {
    return this.httpClient.post<Comment>(this.apiUrl,comment)
  }



}
