const config = {
  production: {
    host: 'https://on-flavor.herokuapp.com',
    port_server: process.env.PORT,
    db: {
      host: 'localhost',
      client: 'pg',
      port: 5432,
      user: 'qvmfuovptjgblm',
      password:
        'f092e9f3f899c6061f649ae7b4ed3d4a92695f462a6343cd20df7145fbb6bfe9',
      database: 'd27k8pnhbmiqad',
      charset: 'utf8',
    },
  },
  development: {
    host: 'http://localhost:8080',
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
