import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environnement} from '../environement/environement';
import {Comment} from '../models/comment';
import {Loan} from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private httpClient:HttpClient,) {

  }

  apiUrl: string = environnement.apiUrl+"loans";

  post(loan: Loan | undefined):Observable<Loan> {
    return this.httpClient.post<Loan>(this.apiUrl,loan)
  }



}
