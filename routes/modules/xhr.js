const express = require('express');
const router = express.Router();

/* GET users listing. */
router.use((req, res, next) => {
  next();
})
// a 'get' req from form
router.get('/form', function(req, res) {
    res.status(200).send({
      code: 200,
      data: {
        method: 'get',
        data: req.query
      },
      msg: 'success'
    });
});

// a 'post' req from form
router.post('/form', function(req, res) {
  res.status(200).send({
    code: 200,
    data: {
      method: 'post',
      data: req.query
    },
    msg: 'success'
  });
});

module.exports = router;
