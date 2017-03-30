const express = require('express');
const web = express.Router();
const api = express.Router();
const bcrypt = require('bcrypt');
const authToken = require('../lib/auth-token');
const bookshelf = require('../bookshelf');
const knex = bookshelf.knex;
const UsersService = require('../services/users_service');

/* GET users listing. */
api.get('/', function(req, res, next) {
 UsersService.fetch().then((users)=> {
   res.json(users);
 });
});

web.get('/', function(req, res, next) {
   UsersService.fetch().then((users) => {
     res.render('../views/users/index', {
       users: users,
     });
   });    
});

web.get('/new', function(req, res, next) {
   res.render('../views/users/new');
});

web.get('/edit/:id', (req, res, next) => {
 UsersService.getById(Number(req.params.id)).then((user) => {
   res.render('../views/users/edit', {
     user: user.toJSON()
   });
 });
});

api.get('/:id', (req, res, next) => {
 UsersService.getById(req.params.id).then((response) => {
   res.json(response);
 })
});



web.get('/:id', (req, res, next) => {
 UsersService.getById(req.params.id).then((user) => {
   res.render('../views/users/show', {
     user: user.toJSON()
   });
 });
});

web.post('/edit/:id', (req, res, next) => {
 const user = {
   name: req.body.name,
   username: req.body.username,
   password: req.body.password,
   id: req.params.id
 };
 UsersService.createOrUpdateWithObj(user).then((newUser) => {
   res.json(newUser)
 }).catch((error) => {
   res.status(500).json(error);
 })
});

api.delete('/:id', (req, res, next) => {
 UsersService.deleteById(req.params.id).then((userDeleted) => {
   res.json(userDeleted);
 })
});

web.get('/login', (req, res, next) => {
  res.render('../views/users/index');
});

api.post('/', function (req, res, next) {
  req.body.user.company_id = req.body.user.company_id == '' ? null : req.body.user.company_id;
  if (req.user && req.user.is_staff && req.body.role == 'admin') {
    return next({ status: 409 });
  }

  const user = req.body.user;

  bcrypt.hash(req.body.user.password, 8, (err, hash) => {
    if (err) return next(err);

    knex('users').insert({
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

api.post('/authorize', function (req, res, next) {
  console.log(req.body);
  knex('users').where({ username: req.body.username }).then((rows) => {
    if (rows.error) return next(rows.error);
    let user = rows[0];
    if (!user) {
      return res.status(401).json({ errors: ['Invalid username or password'] });
    }

    bcrypt.compare(req.body.password, user.password_digest, function (err, valid) {
      if (err) return next(err);
      if (valid) {
        if (!user.confirmed_at) {
          res.status(409).json({ errors: ['Email not confirmed'] });
        } else {
          var token = authToken.encode({
            user_id: user.id
          });
          res.json({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            token: token,
            role: user.role
          });
        }
      } else {
        res.status(401).json({ errors: ['Invalid email or password'] });
      }
    });
  });
});

api.put('/:id', (req, res, next) => {
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

module.exports = {
  web: web,
  api: api
};
