const express = require('express');
const router = express.Router();
const umcLoginURL = 'http://192.168.0.136:9001/#/users-manage'
let state = Date.now();
const timeout = 1000 * 60 * 5;

/* GET users listing. */
router.use((req, res, next) => {
  next();
})
// 登录
router.post('/login', function(req, res) {
  const { userName, password, code } = req.body
  state = Date.now();
  let url = `${umcLoginURL}?code=${code}&state=${state}`
  setTimeout(() => {
    state = Date.now();
  }, timeout)
  res.status(200).send({
    code: '1',
    data: { url, ...req.body },
    message: 'success'
  });
});

// 验证单点登录
router.post('/checkDomain', (req, res) => {
  const { name, password } = req.body;
  res.status(200);
  res.send({
    code: '1',
    data: { isValid: true },
    message: 'success'
  });
})

module.exports = router;
