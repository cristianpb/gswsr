import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  tweets: Tweet[] = [];
  currentPage = 0;

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    console.log('Hello');
    this.getTweets();
  }

  getTweets() {
    this.twitter.fetchTweets(this.currentPage).subscribe(result => {
      this.tweets = result.data;
    });
  }

}
