import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  _url = 'http://localhost:3000/feedback';
  constructor(private _http: HttpClient) { }
  getFeedback() {
    return this._http.get(this._url);
  }
}