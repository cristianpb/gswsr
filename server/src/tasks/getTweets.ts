import { ProcessTweet } from '../lib/processTweet';
import { MongoClient } from 'mongodb';
import { magenta } from 'colors';
import { environment } from '../environment';
import https from 'https';

import Twit from 'twit';
import { CronJob } from 'cron';

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// creating a function that execute self runs
(async () => {
  // connecting at mongoClient
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });

  const db = await connection.db(environment.mongoDatabase);
  console.log('Connected');

  const result = await ProcessTweet.searchTweets(db, T, 'gswsr');
  //connection.close();
  //console.log(result);
})();
