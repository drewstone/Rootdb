var express = require('express')
  , router = express.Router()

var db = require('../db.js')
var Index = require('../models/roots.js')

module.exports = router