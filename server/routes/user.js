const express = require('express')
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

mongoose.connect('mongodb://localhost/Coursework');

const router = express.Router();

router.post('/loginUser', async (req, res) => {
  const body = req.body
  console.log(body);
  body.pwd = md5(md5(body.pwd))
  try {
    let data = await User.findOne({account: body.account, pwd: body.pwd})
    console.log(data);
    if (data) {
      const token = jwt.sign(body.account, 'abc')
      return res.status(200).json({
        err_code: 0,
        message: 'success',
        data,
        token,
      })
    }
    return res.status(200).json({
      err_code: 1,
      message: 'Account does not exist or Pwd is wrong'
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: 'Server Error'
    })
  }
})

router.post('/registerUser', async (req, res) => {
  const body = req.body
  body.pwd = md5(md5(body.pwd))
  try {
    if (await User.findOne({ account: body.account})) {
      return res.status(200).json({
        err_code: 1,
        message: 'Account aleary exists'
      })
    }
    new User(body).save().then((user) => {
      const token = jwt.sign(body.account, 'abc')
      res.status(200).json({
        err_code: 0,
        message: 'ok',
        data: user,
        token,
      })
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: 'Server Error'
    })
  }
})

router.get('/getUserInfo', async (req, res) => {
  let token = req.headers.authorization.split(' ').pop()
  let account = jwt.verify(token, 'abc')
  try {
    let data = await User.findOne({account})
    return res.status(200).json({
      err_code: 0,
      message: 'success',
      data,
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: 'Server Error'
    })
  }
})

module.exports = router;