import { MongoClient, Db } from 'mongodb';
import { magenta, red, blue, yellow, green } from 'colors';
import axios from 'axios';
import {postFacebook} from '../entities/postFacebook';
const FB = require('fb').default;

export class ProcessFacebook {
  token: string;
  facebookPage: string;

  constructor(token: string, facebookPage: string) {
    this.token = token;
    this.facebookPage = facebookPage;
  }

  savePosts = async (db: Db, data: any) => {
    console.log(data);
    const post = await new postFacebook(data);
    console.log(post);
    try {
      const restInsert = await db.collection('documents').insertOne(post);
      return green(`Saved ${post.id} ${restInsert.result.ok}`);
    } catch (err) {
      if (err.code === 11000) {
        const { id } = post
        delete post.id;
        delete post._id;
        const result: any = await db.collection('documents').findOneAndUpdate(
          {id: id},
          {$set: post}
        );
        return blue(`Updated ${post.author} ${result.ok}`);
      } else {
        throw new Error(err);
      }
    }

  }

  searchFacebook = async (db: Db) => {
    FB.options({accessToken: this.token});
    const response = await FB.api(`${this.facebookPage}/posts?fields=message_tags,created_time,is_popular,shares,message,reactions,likes,comments,story,full_picture`);
    if (response.length === 0) {
      return 'Zero posts found';
    } else {
      console.log(`Total posts ${response.data.length}`);
      response.data.forEach(async (data: any) => {
        const msg = await this.savePosts(db, data);
        console.log(msg);
      });
    }
    return `Processed posts`;
  }

  extendToken = () => {
    FB.api('oauth/access_token', {
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      grant_type: 'fb_exchange_token',
      fb_exchange_token: this.token
    }, function (res: any) {
      if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      const accessToken = res.access_token;
      const expires = res.expires ? res.expires : 0;
      console.log("Result");
      console.log(accessToken);
      console.log(expires);
    });
  };



}
