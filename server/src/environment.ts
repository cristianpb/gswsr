const mlab_username = process.env.MLAB_USERNAME;
const mlab_password = process.env.MLAB_PASSWORD;

export const environment = {
  mongourl:  `mongodb://${mlab_username}:${mlab_password}@ds263876.mlab.com:63876/gswsr`,
  mongoDatabase: 'gswsr'
};
