var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var fs = require('fs');

var nodeModulesPath = path.join(__dirname, '../node_modules/');
var clientPath = path.join(__dirname, '../client');
var buildPath = path.join(__dirname, '../client/build');    // for gulped files
var indexHtmlPath = path.join(__dirname, './index.html');
var testPath = path.join(__dirname, '../test');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(nodeModulesPath));
app.use(express.static(clientPath));
app.use(express.static(buildPath));
app.use(express.static(testPath));




/*
Provides a 404 for times
Credit to `fsg` module for this one!
*/
app.use(function (req, res, next) {

  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next(null);
  }

});

// Routes
//// APIs for AJAX




app.use('/', require('./fixtures/'));


//// Index/Home
app.use('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './index.html'));
});


// Errors
//// Not found
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Server issues
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);

});


module.exports = app;

