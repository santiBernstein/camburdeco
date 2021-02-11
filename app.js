var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const session = require('express-session');
const remember = require('./middlewares/remember');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var carritoRouter = require('./routes/carrito');
var apiProducts = require('./routes/api/productsRouterApi.js');
var apiUsers = require('./routes/api/usersRouterApi.js');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(session(
  {secret: 'secreto',
  resave: false,
  saveUninitialized: true }
));
app.use(remember)
app.use(function(req,res,next){
  if(req.session.user != undefined){
    res.locals.user = req.session.user
    res.locals.ides = req.session.ides
    res.locals.tipoUsuario = req.session.tipoUsuario  
  }  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carrito', carritoRouter);
app.use('/api/products', apiProducts);
app.use('/api/users', apiUsers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
