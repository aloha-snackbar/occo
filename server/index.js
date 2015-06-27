'use strict';

var PORT = process.env.PORT || 8080;

//////////////////////////////////////////////////

var config = require('../config');

//////////////////////////////////////////////////

var express = require('express');
var session = require('express-session');
var socketIO = require('socket.io');
var http = require('http');

//////////////////////////////////////////////////

var app = express();
var server = http.Server(app);
var io = socketIO(server);

//////////////////////////////////////////////////

app.use(session({
  secret: config.secret || '',
  resave: false,
  saveUninitialized: false
}));

// Load OAuth Modules
require('./passport')(app, config);

//////////////////////////////////////////////////

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {
    authenticated: req.isAuthenticated(),
    user: req.user
  });
});

app.get('*', function (req, res) {
  res.render('404');
});

server.listen(PORT);

console.log('Server started on port '+PORT+'.');