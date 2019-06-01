import { MongoClient } from 'mongodb';
import { environment } from '../environment';

(async () => {
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });
  const db = connection.db(environment.mongoDatabase);
  const collections = await db.collections();
  const collectionsName = await collections.map((item: any) => item.s.name);
  console.log('collections', collectionsName);
  if (collectionsName.indexOf('postInsta') > -1) {
    console.log('Deleting existing collection');
    await db.dropCollection('postInsta');
  }
  const collectionTweets = await db.collection('postInsta');
  await collectionTweets.createIndex( {id: 1}, { unique: true } );
  await collectionTweets.createIndex( {body: 'text' } );
  console.log('Index Created');
  await connection.close();
})();
