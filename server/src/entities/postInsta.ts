import { rawInstagram } from './rawInstagram';
import moment from 'moment';

export class postInsta {
  id: string;
  author: string;
  body: string;
  media: string;
  date: string;
  timestamp_ms: number;
  favorite_count: number;
  quote_count: number;
  constructor(data: rawTweet) {
    this.id = data.id;
    this.author = data.owner.id;
    if (data.edge_media_to_caption.edges.length > 0) {
      this.body = data.edge_media_to_caption.edges[0].node.text;
    } else {
      this.body = "";
    }
    this.media = ('thumbnail_src' in data) ? data.thumbnail_src : null;
    this.date =  moment.unix(data.taken_at_timestamp).format('ddd MMM DD HH:mm:ss Z YYYY');
    this.timestamp_ms = data.taken_at_timestamp;
    this.favorite_count = data.edge_liked_by.count;
    this.quote_count = data.edge_media_preview_like.count;
  }
}
