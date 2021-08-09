const express = require('express');
const mysql = require('mysql');
const router = express.Router();

/* GET users listing. */
router.use((req, res, next) => {
  console.log('Time: ', (new Date()).toLocaleString())
  next()
})
// 查询
router.get('/getList', function(req, res) {
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
  const resJSON = {
    code: 200,
    data: null,
    msg: 'success'
  }
  const { name, password, userId } = req.body
  if(!userId) {
    resJSON.code = 201
    resJSON.msg = 'userId未传值'
  }else if(!name) {
    resJSON.code = 202
    resJSON.msg = '名字不能为空'
  }else if(!password) {
    resJSON.code = 203
    resJSON.msg = '密码不能为空'
  }else {
    const sql = `UPDATE USER_INFO SET NAME=?, PASSWORD=? WHERE USER_ID=?`
    const sqlData = [name, password, +userId]
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
// 删除
router.delete('/deleteUser', (req, res) => {
  const resJSON = {
    code: 200,
    data: null,
    msg: 'success'
  }
  const userId = req.body.userId
  if(!userId) {
    resJSON.code = 201
    resJSON.msg = 'userId未传值'
  }else {
    const sql = `DELETE FROM USER_INFO WHERE USER_ID = ${ userId }`
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: 'express-learning'
    });
    connection.connect();
    connection.query(sql, (err, result) => {
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

module.exports = router;
