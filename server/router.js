const express = require('express')
const session = require('./routes/session');

const router = express.Router();

router.use(session)

module.exports = router;