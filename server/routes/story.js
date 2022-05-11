const express = require('express')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Story = require('../models/story');

mongoose.connect('mongodb://localhost/Coursework');

const router = express.Router();


router.get('/getStories', async (req, res, next) => {
  console.log(req.params);
  try {
    var data = await Story.find()
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
    next(err);
  }
})

router.get('/getOneStory?:id', async (req, res, next) => {
  console.log(req.query.id);
  try {
    let id = req.query.id
    var data = await Story.findOne({"_id": id})
    return res.status(200).json({
      err_code: 0,
      message: 'success',
      data,
    })
  } catch (err) {
    next(err);
  }
})

router.post('/publishStory', async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ').pop()
    let account = jwt.verify(token, 'abc')
    let story = req.body
    story.author = account
    new Story(story).save().then(() => {
      res.status(200).json({
        err_code: 0,
        message: 'ok',
      })
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router;