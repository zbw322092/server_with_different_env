'use strict';

var express = require('express');
var router = express.Router();

router.use('/about', require('./about'));

module.exports = router;