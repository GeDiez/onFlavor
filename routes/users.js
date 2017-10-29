const express = require('express');
const users = express.Router();
const helpers = require('../lib/helpers');
const authToken = require('../lib/auth-token');

const request = require('superagent');
const bcrypt = require('bcrypt');
const bookshelf = require('../bookshelf');
const knex = bookshelf.knex;
const UsersService = require('../services/users_service');

users.get('/:id', helpers.requireAuthentication, async (req, res, next) => {
  try {
    const user = await UsersService.get(id);
    res.contentType = 'application/json';
    res.statusCode = '200';
    res.json(user);
  } catch (error) {
    res.statusCode = '404';
    res.statusMessage = 'User not exist';
  }
});

users.post('/', function (req, res, next) {
  if (req.user && req.user.is_staff && req.body.role == 'admin') {
    return next({ status: 409 });
  }

  const user = req.body;

  bcrypt.hash(req.body.password, 8, (err, hash) => {
    if (err) return next(err);

    UsersService.createOrUpdateWithObj({
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      role: user.role || null,
      password_digest: hash
    })
    .then((userObj) => {
      if (userObj.error) return next(userObj.error);
      res.json({
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role
      });
    })
    .catch((error) => {
      res.status(401).json({ error: error });
    });
  });

});

users.post('/authorize', (req, res, next) => {
  // knex('users').where({ username: req.body.username }).then((rows) => {
  //   if (rows.error) return next(rows.error);
  //   let user = rows[0];
  //   if (!user) {
  //     return res.status(401).json({ errors: ['Invalid username or password'] });
  //   }

  //   bcrypt.compare(req.body.password, user.password_digest, function (err, valid) {
  //     if (err) return next(err);
  //     if (valid) {
  //       // if (!user.confirmed_at) {
  //       //  res.status(409).json({ errors: ['Email not confirmed'] });
  //       // } else {
  //         var token = authToken.encode({
  //           user_id: user.id
  //         });
  //         res.json({
  //           id: user.id,
  //           full_name: user.full_name,
  //           email: user.email,
  //           token: token,
  //           role: user.role,
  //           username: user.username
  //         });
  //       // }
  //     } else {
  //       res.status(401).json({ errors: ['Invalid email or password'] });
  //     }
  //   });
  // });
});

users.post('/authorize/google', (req, res, next) => {
  const { access_token: token } = req.body;
  const urlUser = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
  request
    .get(urlUser)
    .set('Accept', 'application/json')
    .end((err, { body: user }) => {
      if (err) {
        res.status(401).json({errors: ['Invalid token']});
      }
      UsersService.getByEmail(user.email).then((localUser) => {
        if(localUser) {
          localUser = localUser.toJSON();
          var token = authToken.encode({
            user_id: localUser.id
          });
          return res.json({
            id: localUser.id,
            full_name: localUser.full_name,
            email: localUser.email,
            token: token,
            role: localUser.role,
            username: localUser.username
          });
        }
        UsersService.createOrUpdateWithObj({
          full_name: user.name,
          username: user.email,
          email: user.email,
          role: user.role || null,
        })
        .then((userObj) => {
          if (userObj.error) return next(userObj.error);
          var token = authToken.encode({
            user_id: userObj.id
          });
          return res.json({
            id: userObj.id,
            full_name: userObj.full_name,
            email: userObj.email,
            token: token,
            role: userObj.role,
            username: userObj.username
          });
        })
      });
    });
});

users.put('/:id', (req, res, next) => {
  const user = {
    id: req.params.id,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  UsersService.createOrUpdateWithObj(user).then((newUser) => {
    res.json(newUser)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

users.delete('/:id', (req, res, next) => {
 UsersService.deleteById(req.params.id).then((userDeleted) => {
   res.json(userDeleted);
 })
});

users.get('/:id', (req, res, next) => {
 UsersService.getById(req.params.id).then((response) => {
   res.json(response);
 })
});

module.exports = users
