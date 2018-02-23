/*
  Implementation of interface Router with Expressjs
*/
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const Router = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(fileUpload());

  /* load web site public content */
  app.use('/', express.static('build'));
  /* load web site public content */
  app.use('/onflavor/public', express.static('public'));
  /*  CORS  */
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Authorization, Content-Type, Accept',
    );
    next();
  });
  /*  CORS - END  */

  const User = require('../models/Users');

  /* Authentification using Google+ --- START*/
  app.post('/user/auth', async (req, res) => {
    const { provider, token, id_token } = req.body;
    if (!provider || !token) {
      res.status(409).json({ error: 'se necesitan un provider y un token' });
    }
    switch (provider) {
      case 'google':
        const client = new OAuth2Client(
          '131833217819-0oao54so79c56r86mkb80059qrd52qjh.apps.googleusercontent.com',
          '',
          '',
        );
        try {
          const login = await client.verifyIdToken({
            idToken: id_token,
            audiance:
              '131833217819-0oao54so79c56r86mkb80059qrd52qjh.apps.googleusercontent.com',
            cert_uri: 'https://www.googleapis.com/oauth2/v1/certs',
          });
          const payload = login.getPayload();
          const email = payload['email'];
          const username = payload['given_name'] + new Date().getTime();
          const fullname = payload['name'];
          const image_url = payload['picture'];
          const access_key = token;
          const provider = 'google';
          // if (payload['hd'] !== 'michelada.io')
          //   return res.status(401).json({
          //     error:
          //       'Esta version solo esta disponible para empleados de la empresa michelada.io',
          //   });
          const result = await User.getByEmail(email);
          if (result.codeStatus === 200)
            return res
              .status(result.codeStatus)
              .json({ user: result.data.user });
          const resultCreate = await User.create({
            email,
            username,
            fullname,
            provider,
            image_url,
            access_key,
          });
          res.status(resultCreate.codeStatus).json({ user: resultCreate.user });
        } catch (error) {
          res.status(500).json({ error: 'error en el servidor' + error });
        }
        return;
      default:
        break;
    }
  });

  const authenticateUser = (req, res, next) => {
    // console.log(req.get('Authorization'));
    next();
  };

  app.use(authenticateUser);

  /* Authentification with passport using Google+ --- END*/

  /*
  Implemantation of interface router using Expressjs
*/

  return {
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
};

module.exports = Router;
