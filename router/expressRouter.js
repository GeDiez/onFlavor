/*
  Implementation of interface Router with Expressjs
*/
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Le indicamos a express los assets del sitio web */
app.use('/', express.static('build')));

/* Authentification with passport using Google+ --- START*/
const User = require('../models/modelUsers');
const passport = require('passport');
const expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey' }));
passport.serializeUser(function(user, done) {
  done(null, user.email);
});
passport.deserializeUser(async function(email, done) {
  const user = await User.getProfileByEmail(email);
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '131833217819-ik3ediak6ecr9972sst80v1sqbmamqje.apps.googleusercontent.com',
      clientSecret: 'j3jJSqAqhe7oWaN9moFXBicY',
      callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    async function(token, tokenSecret, profile, done) {
      const user = {
        username: profile.name.givenName,
        full_name: profile.displayName,
        email: profile.emails[0].value,
      };
      const findUser = await User.getProfileByEmail({
        email: profile.emails[0].value,
      });
      if (!findUser) {
        const newUser = await User.create({ user, provider: 'google' });
        return done(null, newUser);
      }
      return done(null, findUser);
    },
  ),
);
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/onflavor');
  },
);
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
/* Authentification with passport using Google+ --- END*/

/*
  Servir la carpeta con la aplicacion web
*/

/*
  Implemantation of interface router using Expressjs
*/

const Router = {
  init: () => {
    const PORT = process.env.PORT || '8080';
    app.listen(PORT, () => {
      console.info(`Server Express Runnig on port ${PORT}`);
    });
  },
  get: (path, callback) => {
    app.get(path, callback);
  },
  post: (path, callback) => {
    app.post(path, callback);
  },
  put: (path, callback) => {
    app.put(path, callback);
  },
  delete: (path, callback) => {
    app.delete(path, callback);
  },
};

module.exports = Router;
