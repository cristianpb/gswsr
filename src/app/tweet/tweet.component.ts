import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Tweet } from '../tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;

  constructor() { }

  ngOnInit() {
  }

  hasPhoto(tweet: Tweet) {
    if (tweet.media) {
      if (tweet.media[0].type === 'photo') {
        return true;
      }
    }
    return false;
  }

  toggleModal() {
    this.media = !this.media;
  }

  hasHashtags(tweet: Tweet) {
    if ('hashtags' in tweet) {
        return true;
    }
    return false;
  }

  hasRetweet(tweet: Tweet) {
    if (tweet.retweet_count > 0) {
        return true;
    }
    return false;
  }

  hasFavorite(tweet: Tweet) {
    if (tweet.favorite_count > 0) {
        return true;
    }
    return false;
  }

}
