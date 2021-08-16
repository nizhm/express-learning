const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const log = require('../../utils/log');

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
    const file = files[''];
    const oldPath = file.path;
    const extension = oldPath.slice(oldPath.lastIndexOf('.'));
    const imgName = `upload_${ Date.now() + extension }`;
    const newPath = path.join(options.uploadDir, imgName);
    fs.rename(oldPath, newPath, err => {
      if(err) {
        log.error(err);
      }else {
        log.info('Rename successfully');
        resJSON.data = { name: imgName };
      }
    });
  });
  setTimeout(() => {
    res.status(200).json(resJSON)
  }, 1000)
});

// 删除图片
router.delete('/deleteImg', (req, res) => {
  const resJSON = {
    code: 200,
    data: null,
    msg: 'delete success'
  };
  const imgName = req.body.name;
  if(!imgName) {
    resJSON.code = 201;
    resJSON.msg = 'Image name is required';
  }else {
    const imgPath = path.join('common', 'file', 'images', imgName);
    fs.rm(imgPath, err => {
      if(err) {
        throw new Error(err);
      }else {
        log.info(`Successfully delete "${ imgName }"`);
      }
    })
  }
  setTimeout(() => {
    res.status(200).json(resJSON);
  }, 1000)
});

// 获取图片
router.post('/fetchImg', (req, res) => {
  const imgName = req.body.name;
  if(!imgName) {
    const resJSON = {
      code: 201,
      data: null,
      msg: 'Image name is required'
    };
    res.status(200).json(resJSON);
  }else {
    const options = {
      root: path.join('common', 'file', 'images'),
    }
    res.sendFile(imgName, options, err => {
      if (err) {
        throw err;
      } else {
        log.info(`Successfully send image ${ imgName }`)
      }
    })
  }
})

module.exports = router;
