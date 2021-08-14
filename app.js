const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// log http request(一个实例打印到日志文件，一个实例打印到控制台)
// use predefined formats: combined/common/dev/short/tiny
morgan.token('status-text', (req, res) => {
  return res.statusMessage
});
const customFormat = '[:date[web]] HTTP/:http-version :method [:url] :status :status-text --- :res[content-length] bytes - :response-time ms';
const logFilePath = path.join('common', 'logs', 'all.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
const morganOptions = {
  immediate: false,
  skip: (req, res) => {
    const status = res.statusCode
    // return status >= 200 && status < 300
    return false
  },
  stream: logStream  //process.stdout
};
app.use(morgan(customFormat, morganOptions));
if(app.get('env') === 'development') {
  app.use(morgan(customFormat));
}

// parse incoming requests with JSON payloads https://www.expressjs.com.cn/4x/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'common')));

app.use((req, res, next) => {
  const { authorization } = req.headers
  if(!authorization) {
    res.sendStatus(403)
    return
  }
  next()
});

app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

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
