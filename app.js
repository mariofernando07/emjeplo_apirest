var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

//se importa el modulo usuarios
var usuarios = require("./routes/usuarios");
var api = require("./routes/api");

var app = express();
var mBD;
mongo.connect("mongodb://localhost:27017/usuariosDB",function (err, db){
  if(err) { 
    console.log("Error al conectarse a mongo");
  } else {
    console.log("Conexión exitosa a mongo");
    mBD = db;
  }
});

//se crea un midleware
app.use(function (req, res, next) {
  //se pasa mBd en el request
  req.db = mBD;
  next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//se especifica la ruta raiz del api
app.use('/usuarios', usuarios);
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
