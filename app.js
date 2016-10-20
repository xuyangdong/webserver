var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlBodyParser = require('./middleware/xmlBodyParser')//自己实现的解析xml请求的中间件
var multipartParser = require('connect-multiparty')

var routes = require('./routes/index');
var users = require('./routes/users');
var tests = require('./routes/test')
// var upload = require('./routes/upload');
// var xml = require('./routes/xmlrouter');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.text({type:'text/xml'}))
app.use(bodyParser.json());
app.use(multipartParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xmlBodyParser)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/xml',function(req,res,next){
  console.log("xml")
  res.send(req.body)
})

app.use('/upload',function(req,res,next){
  console.log("upload",req.files,req.body)
  res.set({
    'Access-Control-Allow-Origin':'*'
  })
  res.send(req.body)
})

app.use('/test',function(req,res,next){
  console.log("test middleware")
  next();
  return
},tests)

app.use('/multipart',function(req,res,next){
  console.log("multipart")
  console.log(req.body)
  console.log(req.get('content-type'))
  res.send('success_multipart')
})

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
