// importing mongoClient to connect at mongodb
import { MongoClient, Db } from 'mongodb';
import { magenta, red, blue, yellow, green } from 'colors';
import { rawInstagram } from '../entities/rawInstragram';
import { postInsta } from '../entities/postInsta';
import axios from 'axios';

export class ProcessInstagram {
  static savePosts = async (db: Db, data: rawInstagram) => {
    const post = await new postInsta(data);
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

  static searchInstagram = async (db: Db, trackTerm: string) => {
    const response = await axios.get(`https://www.instagram.com/explore/tags/${trackTerm}/?__a=1&/`);
    const edges = response.data.graphql.hashtag.edge_hashtag_to_media.edges;
    if (edges.length === 0) {
      return 'Zero instagram posts found';
    } else {
      console.log(`Total posts ${edges.length}`);
      edges.forEach(async (data: any) => {
        const msg = await ProcessInstagram.savePosts(db, data.node);
        console.log(msg);
      });
    }
    return `Processed posts`;
  }

}
