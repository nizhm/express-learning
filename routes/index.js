const express = require('express');

// child router modules
const usersRouter = require('./modules/users');
const uploadRouter = require('./modules/upload');
const authRouter = require('./modules/auth');
const xhrRouter = require('./modules/xhr');
const xssRouter = require('./modules/xss/index');

// create router object
const router = express.Router();

// check authorization
router.use((req, res, next) => {
  // const { authorization } = req.headers
  // if(!authorization) {
  //   res.sendStatus(403)
  //   return
  // }
  const { authorization } = req.headers;
  // 请求参数里获取authorization，解决form表单无法添加header的问题；
  // const { authorization: queryAuth } = req.query;
  // if(!(authorization || queryAuth)) {
  //   res.sendStatus(403)
  //   return
  // }
  next()
});

// match API
router.use('/users', usersRouter);
router.use('/upload', uploadRouter);
router.use('/auth', authRouter);
router.use('/xhr', xhrRouter);
router.use('/xss', xssRouter);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  res.sendStatus(404);
  next();
});

// error handler
router.use((err, req, res, next) => {
  console.log(err)
  const errJSON = {
    code: 500,
    data: null,
    msg: 'Internal Server Error'
  };
  errJSON.msg = err.message || 'Internal Server Error';
  res.status(err.status || 500);
  res.json(errJSON);
});

module.exports = router;
