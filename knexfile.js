const config = require('./config');

module.exports = {
  client: config.db.client,
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    charset: config.db.charset,
  },
  migrations: {
    tableName: 'migrations',
  },
};
