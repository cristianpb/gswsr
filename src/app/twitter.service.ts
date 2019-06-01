import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  fetchTweets(page: number) {
    const url = `${environment.api}/api/tweets/${page}`;
    console.log(url);
    return this.http.get(url);
  }
}
