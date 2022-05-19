const express = require('express');
const router = express.Router();
const umcLoginURL = 'http://192.169.1.92:8000/umc/#/login'
let code = Date.now();
const timeout = 1000 * 60 * 1;

/* GET users listing. */
router.use((req, res, next) => {
  next();
})
// 登录
router.post('/login', function(req, res) {
  const { userName, password } = req.body
  let { state } = req.body
  state = state || '123456'
  code = Date.now();
  let url = `${umcLoginURL}?state=${state}&code=${code}`
  setTimeout(() => {
    code = Date.now();
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
