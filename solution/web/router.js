const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function (req, res, next) {
  fs.readFile(path.join(__dirname + '/views/home.html'), (err, data) => {
    if (err) {
      next(err);
    }
    res.send(data.toString());
  })
})

router.get('/home.html', function (req, res, next) {
  fs.readFile(path.join(__dirname + '/views/home.html'), (err, data) => {
    if (err) {
      next(err);
    }
    res.send(data.toString());
  })
})

router.get('/login.html', function (req, res, next) {
  fs.readFile(path.join(__dirname + '/views/login.html'), (err, data) => {
    if (err) {
      next(err);
    }
    res.send(data.toString());
  })
})

router.get('/publish.html', function (req, res, next) {
  fs.readFile(path.join(__dirname + '/views/publish.html'), (err, data) => {
    if (err) {
      next(err);
    }
    if (err) {
      next(err);
    }
    res.send(data.toString());
  })
})

router.get('/register.html', function (req, res, next) {
  fs.readFile(path.join(__dirname + '/views/register.html'), (err, data) => {
    if (err) {
      next(err);
    }
    res.send(data.toString());
  })
})

router.get('/room.html', function (req, res, next) {
  fs.readFile(path.join(__dirname + '/views/room.html'), (err, data) => {
    if (err) {
      next(err);
    }
    res.send(data.toString());
  })
})

module.exports = router;