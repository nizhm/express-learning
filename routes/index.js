const express = require('express');

// child router modules
const usersRouter = require('./modules/users');
const uploadRouter = require('./modules/upload');
const authRouter = require('./modules/auth');

// create router object
const router = express.Router();

// check authorization
router.use((req, res, next) => {
  const { authorization } = req.headers
  if(!authorization) {
    res.sendStatus(403)
    return
  }
  next()
});
// match API
router.use('/users', usersRouter);
router.use('/upload', uploadRouter);
router.use('/auth', authRouter);

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
