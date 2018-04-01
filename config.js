const config = {
  production: {
    host: 'ec2-54-235-146-184.compute-1.amazonaws.com',
    port_server: process.env.PORT,
    db: {
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
