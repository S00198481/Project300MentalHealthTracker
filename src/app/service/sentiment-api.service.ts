import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import credentials from 'credentials.json';

@Injectable({
  providedIn: 'root'
})
export class SentimentApiService {

  constructor(private _http:HttpClient) { }

  private _siteURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text="

  getEmotion(text):Observable<JSON> {
    const headers = { 
      "x-rapidapi-host": credentials.RAPID_API_HOST,
      "x-rapidapi-key": credentials.RAPID_API_KEY}
    return this._http.get<JSON>(this._siteURL + text, {headers})
        .pipe(
          tap(data => console.log(data)
          ),
          catchError(this.handleError)
        );
  }

  getSentiment(text):Observable<JSON> {
    const headers = { 
      "x-rapidapi-host": credentials.RAPID_API_HOST,
      "x-rapidapi-key": credentials.RAPID_API_KEY}
    return this._http.get<JSON>(this._siteURL + text, {headers})
        .pipe(
          tap(data => console.log(data)
          ),
          catchError(this.handleError)
        );
  }

  private handleError(err:HttpErrorResponse) {
    console.log('MagicApiService: ' + err.message);
    return Observable.throw(err.message);
  }
}
