module.exports = {
  production: {
    client: 'pg',
    connection: {
      host: process.env.HOST || 'localhost:5432',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: '',
      charset: 'utf8',
    },
  },
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'on_flavor',
      charset: 'utf8',
    },
    migrations: {
      tableName: 'migrations',
    },
  },
};
