var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var plot3Router =require('./routes/plot3');
var plot4Router = require('./routes/plot4_deadline');
var locationRouter = require('./routes/gps');
var piazzaRouter = require('./routes/piazza');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/plot', plot3Router);
app.use('/plot4', plot4Router);
app.use('/gps',locationRouter);
app.use('/piazza',piazzaRouter);


module.exports = app;
