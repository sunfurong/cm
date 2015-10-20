var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//内存session
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//settings配置文件
//var settings = require('./settings');
//引入flash
var flash = require('connect-flash');

/*
* session
* */
//var session =require('express-session');
//var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 按照上面的解释，设置 session 的可选参数
app.use(session({
  secret: 'mycm', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

//设置session
//app.use(session({
//  secret: settings.cookieSecret,
//  key: settings.db,//cookie name
//  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
//  store: new MongoStore({
//    db: settings.db,
//    host: settings.host,
//    port: settings.port,
//    auto_reconnect: true
//  }),
//  resave:false,
//  saveUninitialized:true
//}));
// app.use('/', routes);
app.use('/users', users);
routes(app);
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
