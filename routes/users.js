const express = require('express');
const api = express.Router();
const web = express.Router();
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


api.post('/', (req, res, next) =>{
 const user = {
   name: req.body.name,
   username: req.body.username,
   password: req.body.password
 };
 UsersService.createOrUpdateWithObj(user).then((message) => {
   res.json(message);
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

module.exports = {
   api: api,
   web: web
};
