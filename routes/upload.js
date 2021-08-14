const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

/* GET users listing. */
router.use((req, res, next) => {
  next()
})

// 上传图片
router.post('/image', (req, res) => {
  const resJSON = {
    code: 200,
    data: null,
    msg: 'success'
  }
  const options = {
    keepExtensions: true,
    encoding: 'utf-8',
    uploadDir: path.join('common', 'file', 'images'),
    multiples: true
  }
  const form = formidable(options);
  form.parse(req, (err, fields, files) => {
    if(err) {
      console.log(err.toString())
    }
    console.log(fields);
    const file = files[''];
    const oldPath = file.path;
    const extension = oldPath.slice(oldPath.lastIndexOf('.'));
    const newPath = path.join(options.uploadDir, `upload_${ Date.now() + extension }`);
    fs.rename(oldPath, newPath, err => {
      if(err) {
        console.error(err)
      }else {
        console.log('Rename successfully')
      }
    })
    console.log(file)
  })
  setTimeout(() => {
    res.status(200).json(resJSON)
  }, 1000)
})
// 删除图片
router.delete('/deleteImage', (req, res) => {
  const resJSON = {
    code: 200,
    data: null,
    msg: 'delete success'
  }
  setTimeout(() => {
    res.status(200).json(resJSON)
  }, 1000)
})

module.exports = router;
