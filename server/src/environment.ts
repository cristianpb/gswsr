//const mlab_username = process.env.MLAB_USERNAME;
//const mlab_password = process.env.MLAB_PASSWORD;
const atlas_url = process.env.ATLAS_URL;

export const environment = {
  // mongourl:  `mongodb://${mlab_username}:${mlab_password}@ds263876.mlab.com:63876/gswsr`,
  mongourl:  `${atlas_url}`,
  mongoDatabase: 'gswsr'
};
