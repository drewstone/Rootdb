var express = require('express')
  , router = express.Router()

var db = require('../db.js')
var Index = require('../models/index.js')
router.get('/', function(req, res) {
  // Index.doSomething(function(err, data) {
  //   res.render('home.jade')
  // })
})



module.exports = router
