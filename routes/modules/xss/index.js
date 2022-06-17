const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  // xss API允许所有跨域请求；
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  next();
});

// A 'GET' req stimulate reflected XSS attack
router.get('/reflected', function(req, res) {
  res.status(200).send({
    code: 200,
    data: {
      method: 'get',
      data: req.query
    },
    msg: 'success'
  });
});

// A 'GET' req stimulate stored XSS attack
router.get('/stored', function(req, res) {
  res.status(200).send({
    code: 200,
    data: {
      method: 'get',
      data: req.query
    },
    msg: 'success'
  });
});

// A 'POST' req stimulate stored XSS attack
router.post('/stored', function(req, res) {
  res.status(200).send({
    code: 200,
    data: {
      method: 'post',
      data: req.body
    },
    msg: 'success'
  });
});

// A 'GET' req stimulate DOM XSS attack
router.get('/dom', function(req, res) {
  res.status(200).send({
    code: 200,
    data: {
      method: 'get',
      data: req.query
    },
    msg: 'success'
  });
});

// A 'POST' req stimulate DOM XSS attack
router.post('/dom', function(req, res) {
  res.status(200).send({
    code: 200,
    data: {
      method: 'post',
      data: req.body
    },
    msg: 'success'
  });
});

module.exports = router;
