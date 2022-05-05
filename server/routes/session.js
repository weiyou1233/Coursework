const express = require('express')
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const User = require('../models/user');

mongoose.connect('mongodb://localhost/Coursework');

const router = express.Router();

router.post('/login', async (req, res) => {
  const body = req.body
  body.pwd = md5(md5(body.pwd))
  try {
    let data = await User.findOne({account: body.account, pwd: body.pwd})
    if (data) {
      return res.status(200).send({
        err_code: 0,
        message: 'success',
        data: data
      })
    }
    return res.status(200).send({
      err_code: 1,
      message: 'Account does not exist or Pwd is wrong'
    })
  } catch (err) {
    return res.status(500).send({
      err_code: 500,
      message: 'Server Error'
    })
  }
})  

router.post('/register', async (req, res) => {
  const body = req.body
  body.pwd = md5(md5(body.pwd))
  try {
    if (await User.findOne({ account: body.account})) {
      return res.status(200).send({
        err_code: 1,
        message: 'Account aleary exists'
      })
    }
    new User(body).save().then((user) => {
      res.status(200).send({
        err_code: 0,
        message: 'ok',
        data: user
      })
    })
  } catch (err) {
    return res.status(500).send({
      err_code: 500,
      message: 'Server Error'
    })
  }
})

module.exports = router;