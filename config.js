const config = {
  production: {
    host: '',
  },
  development: {
    host: 'localhost',
    port_server: 8080,
    port_webapp: 9000,
    db: {
      client: 'pg',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'on_flavor',
      charset: 'utf8',
    },
  },
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? config.production
    : config.development;
