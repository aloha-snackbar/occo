'use strict';

var config = require('../config');

//////////////////////////////////////////////////

var PORT = process.env.PORT || config.port || 8443;

//////////////////////////////////////////////////

var express = require('express');
var session = require('express-session');
var socketIO = require('socket.io');
var protocol = require('spdy');
var compression = require('compression');

//////////////////////////////////////////////////

var serverOptions = {
  key: config.tls.key,
  cert: config.tls.cert
};

var app = express();
var server = protocol.createServer(serverOptions, app);
var io = socketIO(server);

//////////////////////////////////////////////////

app.use(compression());

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