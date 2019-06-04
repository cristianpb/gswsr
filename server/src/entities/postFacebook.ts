import { rawFacebook } from './rawFacebook';
import moment from 'moment';

export class postFacebook {
  created_time: string;
  story: string;
  id: string;
  body: string;
  date: string;
  timestamp_ms: number;
  shares: number;
  comments_count: number;
  media: string;
  social_media: string;
  constructor(data: rawFacebook) {
    this.social_media = 'facebook';
    this.id = data.id;
    this.author = data.id.split("_")[0];
    this.story = data.story;
    this.body = data.message
    this.media = ('full_picture' in data)? data.full_picture: undefined;
    this.timestamp_ms = moment(data.created_time, 'YYYY-MM-DDTHH:mm:ss+Z').valueOf();
    this.date =  moment(data.created_time, 'YYYY-MM-DDTHH:mm:ss+Z').format('ddd MMM DD HH:mm:ss Z YYYY');
    if ('shares' in data) {
      this.shares = data.shares.count;
    } else {
      this.shares = 0;
    }
    if ('comments' in data) {
      this.comments_count = data.comments.data.length;
    } else {
      this.comments_count = 0;
    }
  }
}
