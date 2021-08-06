const express = require('express');
const mysql = require('mysql');
const router = express.Router();

/* GET users listing. */
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
//router.get('/', (req, res) => {
//  res.status(200).send({
//    code: 200,
//    data: 'Here is USER_INFO',
//    msg: 'success'
//  })
//})
router.get('/getList', function(req, res, next) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'express_learning'
  });
  connection.connect();
  const sql = "SELECT * FROM USER_INFO;";
  connection.query(sql, (err, result) => {
    if(err) {
      console.log(err);
      res.status(200).send({
        code: 500,
        data: null,
        msg: err.sqlMessage
      });
      return
    }
    const list = [];
  for(const item of result) {
    const row = {
      userId: item.USER_ID,
      name: item.NAME,
      password: item.PASSWORD
    };
    list.push(row);
  }
  res.status(200).send({
    code: 200,
    data: list,
    msg: 'success'
  });
  connection.destroy();
})
});

module.exports = router;
