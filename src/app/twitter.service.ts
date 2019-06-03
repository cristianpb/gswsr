import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Tweet } from './tweet';

export interface TwitterResponse {
  data: Tweet[];
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  fetchTweets(page: number) {
    const url = `${environment.api}/api/tweets/${page}`;
    return this.http.get<TwitterResponse>(url);
  }

  fetchDocuments(page: number) {
    const url = `${environment.api}/api/documents/${page}`;
    return this.http.get(url);
  }
}
