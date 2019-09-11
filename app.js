const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const crypt = require('bcrypt-nodejs');
const session = require('express-session');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const engine = require('ejs-locals');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const flash = require('connect-flash');
const passport = require('passport');

const multer = require('multer');


//var LocalStrategy = require('passport-local').Strategy;
//const usuarios = require('./dbops/mongops');
require('./passport')(passport);
//dbase

const {url} = require('./config/dbase');
const db = mongoose.connect(url,
  { useNewUrlParser: true

})
.catch((error) => { console.log(error); });

process.env.PWD = process.cwd(); //para ruta de la imagen subida 

//routes
const indexRouter = require('./routes/index');
const auth = require('./routes/auth')(passport);

/*const usersRouter = require('./routes/users');
const registroRouter = require('./routes/registro');
const logRouter = require('./routes/login');
const pfilRouter = require('./routes/perfil');
const upRouter = require('./routes/upload'); */


// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.static(process.env.PWD + '/public'));
app.use(logger('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'socialred',
  resave: false, 
  saveUninitialized:false
}));
app.use(flash());
app.use(fileUpload());

  
app.use(passport.initialize());
app.use(passport.session());
//routes

app.use('/', indexRouter);
app.use('/users', indexRouter);
app.use('/registro', indexRouter);
app.use('/login', indexRouter);
app.use('/perfil', indexRouter );
app.use('/upload', indexRouter );
app.use('/auth', auth);
app.use('/perfiledit', indexRouter);
app.use('/amigos', indexRouter);
app.use('/blog', indexRouter);


// passport config
//const cuenta = require('./config/passport');
//passport.use(cuenta.authenticate());


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
