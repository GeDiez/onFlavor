const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const User = require('../models/User');

module.exports = {
  async signUp ({username, password}) {
    try {
      const userData = await User.where('username', username).fetch();
      const userJson = await userData.toJSON();
      const isValidPassword = bcrypt.compareSync(password, userJson.password_digest);
      const exp = moment().add(1, 'days').calendar();
      const payload = {
        idUser: userJson.id,
        username: userJson.username,
        exp,
      }
      console.log('qwqw',userJson, process.env.JWT_SECRET)
      const token = jwt.encode(payload, process.env.JWT_SECRET);
      if(isValidPassword) {
        return {
          id: userJson.id,
          full_name: userJson.full_name,
          email: userJson.email,
          role: userJson.role,
          username: userJson.username,
          token: token,
          exp
        }
      }
      if(!user || !isValidPassword) {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}