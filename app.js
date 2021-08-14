const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();

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
app.use(morgan(customFormat + ':user-agent', morganOptions));
if(app.get('env') === 'development') {
  app.use(morgan(customFormat));
}

// parse incoming requests with JSON payloads https://www.expressjs.com.cn/4x/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'common')));

// entry router
app.use('/', router);

module.exports = app;
