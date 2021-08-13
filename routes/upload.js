const express = require('express');
const router = express.Router();

/* GET users listing. */
router.use((req, res, next) => {
  console.log('Time: ', (new Date()).toLocaleString())
  next()
})

// 上传图片
router.post('/image', (req, res) => {
  const resJSON = {
    code: 200,
    data: null,
    msg: 'success'
  }
  res.status(200)
  setTimeout(() => {
    res.send(resJSON)
  }, 2000)
})

module.exports = router;
