/*
  Occo v1.0.0
  Created by aloha-snackbar
*/

'use strict';

var PORT = 8080 || process.env.PORT;
var SECRET = 'keyboard cat';

//////////////////////////////////////////////////

require('coffee-script/register');

GLOBAL.CONFIG = require('./config');

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
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}));

// Load OAuth Modules
require('./lib/passport')(app);

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

console.log("Server started on port "+PORT+".")