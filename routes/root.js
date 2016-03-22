var express = require('express')
  , router = express.Router()

var db = require('../db.js')
var Index = require('../models/root.js')

module.exports = router