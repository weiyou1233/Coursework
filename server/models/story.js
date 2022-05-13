const mongoose = require('mongoose');

const Schema = mongoose.Schema

const storySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  ctime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Story', storySchema)