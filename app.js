var express = require('express');
var app = express();
var server = require('http').Server(app);

var aws = require('aws-sdk');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);

//Assign Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Assign routes

const users  = require('./routes/users');
// const dishes = require('./routes/dishes');
// const events = require('./routes/events');
// const groups = require('./routes/groups');
// const orders = require('./routes/orders');
// const places = require('./routes/places');
// const foodcourt = require('./routes/foodcourt');

app.use('/api/users', users);
// app.use('/api/places', places);
// app.use('/api/dishes', dishes);
// app.use('/api/groups', groups);
// app.use('/api/orders', orders);
// app.use('/api/events', events);
// app.use('/api/foodcourts', foodcourt);

//Listening conections via sockets

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
