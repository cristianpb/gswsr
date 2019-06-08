import { MongoClient } from 'mongodb';
import { environment } from '../environment';
import { ProcessInstagram } from '../lib/processInstagram';
import { ProcessTweet } from '../lib/processTweet';
import { ProcessFacebook } from '../lib/processFacebook';
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

  const FB = new ProcessFacebook(process.env.FACEBOOK_ACCESSTOKEN_GSWSR, 'MySustainableRevolution');
  const result = await ProcessInstagram.searchInstagram(db, 'gswsr');
  new CronJob({
    cronTime: '*/6 * * * *',
    onTick: async function () {
      /*
       * At every 6 minutes
       */
      await ProcessInstagram.searchInstagram(db, 'gswsr');
      await ProcessTweet.searchTweets(db, T, 'gswsr');
      await FB.searchFacebook(db);
    },
    start: true,
    timeZone: 'Europe/Paris'
  });
  //connection.close();
})();
