import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-post-facebook',
  templateUrl: './post-facebook.component.html',
  styleUrls: ['./post-facebook.component.scss']
})
export class PostFacebookComponent implements OnInit {
  media: boolean = false;
  @Input() postFacebook;


  constructor() { }

  ngOnInit() {
  }

  hasPhoto(postFacebook) {
    if (postFacebook.media) {
      return true;
    }
    return false;
  }

  toggleModal() {
    this.media = !this.media;
  }

  hasShares(postFacebook) {
    if (postFacebook.shares > 0) {
        return true;
    }
    return false;
  }

  hasCommentsCount(postFacebook) {
    if (postFacebook.comments_count > 0) {
        return true;
    }
    return false;
  }


}
