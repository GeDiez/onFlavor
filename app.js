var express = require('express');
var app = express();

var aws = require('aws-sdk');
var path = require('path');
var bodyParser = require('body-parser');

//Assign Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

if(!(process.env.NODE_ENV === 'production')) {
  const logger = require('morgan');
  const webpack = require('webpack');
  const webPackMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(webPackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(logger('dev'));
}

app.use('*', (req, res) => {
  res.redirect('/');
})

//Assign routes
const users  = require('./routes/users');
app.use('/api/users', users);

//Sockets

var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('events', function (socket) {
  });
});

const S3_BUCKET = process.env.S3_BUCKET;
app.post('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.body['file-name'];
  const fileType = req.body['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json(returnData);
  });
});

module.exports = { app, server };
