// importing mongoClient to connect at mongodb
import { MongoClient, Db } from 'mongodb';
import { rawTweet } from '../entities/rawTweet';
import { Tweet } from '../entities/tweet';
import { magenta, red, blue, yellow, green } from 'colors';
import moment from 'moment';

export class ProcessTweet {
  static saveTweets = async (db: Db, data: rawTweet) => {
    const tweet = await new Tweet(data);
    try {
      const isBan = await ProcessTweet.isBanned(tweet.body);
      if (isBan) {
        return red(`Banned ${tweet.body}`);
      } else {
        // await ProcessTweet.saveMetadata(db, tweet);
        const resInsert = await db.collection('tweets').insertOne(tweet);
        return green(`Saved ${tweet.screenname} ${resInsert.result.ok}`);
      }
    } catch (err) {
      if (err.code === 11000) {
        delete tweet._id;
        const result: any = await db.collection('tweets').findOneAndUpdate(
          {twid: tweet.twid},
          {$set: tweet}
        );
        return blue(`Updated ${tweet.screenname} ${result.ok}`);
      } else {
        throw new Error(err);
      }
    }
  }

  static isBanned = async (text: string) => {
    const bannedTerms = await ['#sex', '#porn', '#porno', 'porn', 'sex', 'porno', 'sexo'].join('|');
    const regex2 = await new RegExp(`(?:^|(?<= ))(${bannedTerms})(?:(?= )|$)`, 'gim');
    if (!(regex2.test(text))) {
      return false;
    } else {
      return true;
    }
  }

  static searchTweets = async (db: Db, T: any, trackTerm: string) => {
    // const enddate = moment().subtract(2, 'days').format('YYYY-MM-DD');
    const result = await T.get('search/tweets', {
      q: trackTerm,
      // until: enddate,
      count: 50,
      result_type: 'mixed',
      tweet_mode: 'extended'
    });
    if (result.data.statuses.length === 0) {
      return 'Zero tweets found';
    }
    console.log(`Total tweets ${result.data.statuses.length}`);
    await result.data.statuses.forEach(async (tweet: rawTweet) => {
      if (!('retweeted_status' in tweet)) {
        const msg = await ProcessTweet.saveTweets(db, tweet);
        console.log(msg);
      } else {
        console.log(red(`Retweet ${tweet.retweeted_status.user.screen_name}`));
        const msg = await ProcessTweet.saveTweets(db, tweet.retweeted_status);
        console.log(msg);
      }
    });
    return 'Processed tweets';
  }
}


interface SetTags {
  mentions?: string[];
  hashtags?: string[];
}

interface ResultSearchTweets {
  data: any;
  resp: any;
}
