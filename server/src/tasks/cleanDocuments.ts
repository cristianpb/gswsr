import { MongoClient } from 'mongodb';
import { environment } from '../environment';

(async () => {
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });
  const db = connection.db(environment.mongoDatabase);
  const collections = await db.collections();
  const collectionsName = await collections.map((item: any) => item.s.name);
  console.log('collections', collectionsName);
  if (collectionsName.indexOf('documents') > -1) {
    console.log('Deleting existing tweets');
    await db.dropCollection('documents');
  }
  const collectionTweets = await db.collection('documents');
  await collectionTweets.createIndex( {id: 1, social_media: 1}, { unique: true } );
  await collectionTweets.createIndex( {body: 'text' } );
  console.log('Index Created');
  try {
    if (collectionsName.indexOf('hashtags') > -1) {
      console.log('Deleting existing hashtags');
      await db.dropCollection('hashtags');
    }
    const collectionTags = await db.collection('hashtags');
    await collectionTags.createIndex( {label: 1} );
    await connection.close();
    console.log('Reset hashtags');
  } catch (err) {
    console.log('Error hashtags', err);
  }
})();
