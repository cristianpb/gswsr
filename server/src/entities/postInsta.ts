import { rawInstagram } from './rawInstragram';
import moment from 'moment';

export class postInsta {
  id: string;
  _id: string;
  author: string;
  body: string;
  media: string;
  date: string;
  timestamp_ms: number;
  favorite_count: number;
  preview_like: number;
  comments_count: number;
  video_view_count: number;
  is_video: boolean;
  social_media: string;
  constructor(data: rawInstagram) {
    this.social_media = 'instagram';
    this.id = data.id;
    this.author = data.owner.id;
    if (data.edge_media_to_caption.edges.length > 0) {
      this.body = data.edge_media_to_caption.edges.map((x: any) => x.node.text.toString()).toString();
    } else {
      this.body = '';
    }
    this.media = ('thumbnail_src' in data) ? data.thumbnail_src : null;
    this.timestamp_ms = (data.taken_at_timestamp * 1000);
    this.date =  moment.unix(data.taken_at_timestamp).format('ddd MMM DD HH:mm:ss Z YYYY');
    this.favorite_count = data.edge_liked_by.count;
    this.comments_count = data.edge_media_to_comment.count;
    this.preview_like = data.edge_media_preview_like.count;
    this.is_video = data.is_video;
    if (data.is_video === true) {
      this.video_view_count = data.video_view_count;
    } else {
      this.video_view_count = 0;
    }
  }
}
