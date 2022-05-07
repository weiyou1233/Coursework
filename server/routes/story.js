const express = require('express')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Story = require('../models/story');

mongoose.connect('mongodb://localhost/Coursework');

const router = express.Router();


router.get('/getStory', async (req, res) => {
  try {
    let data = await Story.find()
    data.sort((a, b) => {
      if (a.ctime < b.ctime) {
        return 1
      } else {
        return -1
      }
    })
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

router.post('/publishStory', async (req, res) => {
  try {
    const body = req.body
    new Story(body).save().then((story) => {
      res.status(200).json({
        err_code: 0,
        message: 'ok',
        data: story
      })
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: 'Server Error'
    })
  }
})

module.exports = router;