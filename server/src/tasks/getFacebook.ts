import { MongoClient } from 'mongodb';
import { environment } from '../environment';
import { ProcessFacebook } from '../lib/processFacebook';

// creating a function that execute self runs
(async () => {
  // connecting at mongoClient
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });

  const db = await connection.db(environment.mongoDatabase);
  console.log('Connected');

  const FB = new ProcessFacebook(process.env.FACEBOOK_ACCESSTOKEN_GSWSR, 'MySustainableRevolution');
  //FB.extendToken();
  await FB.searchFacebook(db);
  //connection.close();
  //console.log(result);
})();
