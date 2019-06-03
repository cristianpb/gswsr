import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-post-insta',
  templateUrl: './post-insta.component.html',
  styleUrls: ['./post-insta.component.scss']
})
export class PostInstaComponent implements OnInit {
  media: boolean = false;
  @Input() postInsta;

  constructor() { }

  ngOnInit() {
  }

  hasPhoto(postInsta) {
    if (postInsta.media) {
      return true;
    }
    return false;
  }

  toggleModal() {
    this.media = !this.media;
  }

  hasFavorite(postInsta) {
    if (postInsta.favorite_count > 0) {
        return true;
    }
    return false;
  }

}
