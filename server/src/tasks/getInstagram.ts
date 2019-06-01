import { MongoClient } from 'mongodb';
import { environment } from '../environment';
import { ProcessInstagram } from '../lib/processInstagram';

// creating a function that execute self runs
(async () => {
  // connecting at mongoClient
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });

  const db = await connection.db(environment.mongoDatabase);
  console.log('Connected');

  const result = await ProcessInstagram.searchInstagram(db, 'gswsr');
  //connection.close();
  //console.log(result);
})();
