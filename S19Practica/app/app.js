var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('hbs');
const mongoose = require('mongoose');
const methods = require('./methods');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/brands');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials', function(err){});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// soporte para el cuerpo
app.use(bodyParser.urlencoded({ extended: true}));

//inyectar el usuario leyendo el authToken de las cookies
app.use((req, res, next) => {
  //obtener el token de la cookies
  const authToken = req.cookies['AuthToken'];

  //inyectar el usuario al request
  req.user = methods.authTokens[authToken];
  next();
})

//registro de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand', brandRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//conexion a mongodb
mongoose.connect('mongodb://localhost:27017/exampleDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Se ha establecido la conexión'))
.catch(e => console.log('Error de conexión', e))

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
