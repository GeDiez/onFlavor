var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var foodcourt = require('./routes/foodcourt');
var users_groups = require('./routes/users_groups');

var dishes = require('./routes/dishes').api;
var users = require('./routes/users').api;
var places = require('./routes/places').api;
var groups = require('./routes/groups').api;
var orders = require('./routes/orders').api;
var events = require('./routes/events').api;

var dishesWeb = require('./routes/dishes').web;
var usersWeb = require('./routes/users').web;
var placesWeb = require('./routes/places').web;
var groupsWeb = require('./routes/groups').web;
var ordersWeb = require('./routes/orders').web;
var eventsWeb = require('./routes/events').web;

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/foodcourts', foodcourt);
app.use('/api/places', places);
app.use('/api/dishes', dishes);
app.use('/api/groups', groups);
app.use('/api/users_groups', users_groups);
app.use('/api/orders', orders);
app.use('/api/events', events);
app.use('/places', placesWeb);
app.use('/orders', ordersWeb);
app.use('/events', eventsWeb);
app.use('/groups', groupsWeb);
app.use('/users', usersWeb);
app.use('/dishes', dishesWeb);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
