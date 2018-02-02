const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  port: process.env.PORT_DB,
  host: process.env.HOST,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports.sequelize = sequelize;
