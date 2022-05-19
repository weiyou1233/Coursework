const express = require('express')
const user = require('./routes/user');
const story = require('./routes/story');

const router = express.Router();

router.use(user)
router.use(story)

module.exports = router;