// importing mongoClient to connect at mongodb
import { MongoClient, Db } from 'mongodb';
import { magenta, red, blue, yellow, green } from 'colors';
import { rawInstagram } from '../entities/rawInstragram';
import { postInsta } from '../entities/postInsta';
import axios from 'axios';

export class ProcessInstagram {

  static saveHashtag = async (db: Db, post: postInsta, reg: RegExp, annotationType: string) => {
    const hashtags = await post.body.match(reg);
    const updateVal: SetTags = await {};
    if (annotationType === 'mention') {
      updateVal.mentions = hashtags;
    }
    if (annotationType === 'hashtag') {
      updateVal.hashtags = hashtags;
    }
    if (hashtags) {
      console.log('Text: ', post.body, '\n', annotationType, ': ', hashtags);
      if (hashtags.length > 0) {
        try {
          await db.collection('documents').findOneAndUpdate(
            {id: post.id},
            { $set: updateVal}
          );
          console.log(`updated post ${post.id}`);
        } catch (err) {
          console.log('Post update error', err);
        }
      }
    } else {
      console.log(yellow(`Text: ${post.body} \nNo ${annotationType}`));
    }
  }

  static saveMetadata = async (db: Db, post: postInsta) => {
    const msg3 = ProcessInstagram.saveHashtag(db, post, /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/gm, 'hashtag');
    const msg4 = ProcessInstagram.saveHashtag(db, post, /@(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/gm, 'mention');
  }

  static savePosts = async (db: Db, data: rawInstagram) => {
    const post = await new postInsta(data);
    try {
      await ProcessInstagram.saveMetadata(db, post);
      const restInsert = await db.collection('documents').insertOne(post);
      return green(`Saved ${post.id} ${restInsert.result.ok}`);
    } catch (err) {
      if (err.code === 11000) {
        const { id } = post;
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

interface SetTags {
  mentions?: string[];
  hashtags?: string[];
}
