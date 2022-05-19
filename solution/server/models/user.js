const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  ctime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)