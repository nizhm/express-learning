const express = require('express');
const mysql = require('mysql');
const router = express.Router();

/* GET users listing. */
router.use((req, res, next) => {
  console.log('Time: ', (new Date()).toLocaleString())
  next()
})
// 查询
router.get('/getList', function(req, res, next) {
  const { name, password } = req.query
  const nameCondition = name ? `WHERE NAME='${ name }'` : ''
  const passwordCondition = password ? `WHERE PASSWORD='${ password }'` : ''
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'express-learning'
  });
  connection.connect();
  const sql = `SELECT * FROM USER_INFO ${ nameCondition } ${ passwordCondition };`;
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
// 新增
router.post('/addUser', (req, res) => {
  const resJSON = {
    code: 200,
    data: null,
    msg: 'success'
  }
  const { name, password } = req.body
  if(!name) {
    resJSON.code = 201
    resJSON.msg = '名字不能为空'
  }else if(!password) {
    resJSON.code = 202
    resJSON.msg = '密码不能为空'
  }else {
    console.log(name, password)
    const sql = `INSERT INTO USER_INFO(NAME, PASSWORD) VALUES(?, ?)`
    const sqlData = [name, password]
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: 'express-learning'
    });
    connection.connect();
    connection.query(sql, sqlData, (err, result) => {
      console.log(result)
      if (err) {
        resJSON.code = 500
        resJSON.msg = err.sqlMessage
      }
      connection.destroy();
    })
  }
  res.status(200)
  res.send(resJSON)
})
// 修改
router.put('/modifyUser', (req, res) => {
  console.log('modify', req.body)
  res.status(200)
  res.send({
    code: 200,
    data: 'Modify api',
    msg: 'success'
  })
})
// 删除
router.delete('/deleteUser', (req, res) => {
  res.status(200)
  res.send({
    code: 200,
    data: 'Delete api',
    msg: 'success'
  })
})

module.exports = router;
