var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); 
var logger = require('morgan');

//Load the mongoose module
require('./lib/connectMongoose');

//Load the Products API
require('./routes/api/products');




var app = express();

app.locals.title = 'NodePop';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images'));


//Routes of my API
app.use('/api/products', require('./routes/api/products'));






//Routes of my website
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) {
    err.status = 422;
    const errorInfo = err.array({ onlyFirstError: true} )[0];
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }


  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
