var express = require('express')
  , router = express.Router()

var db = require('../db.js')
var Users = require('../models/users.js')

/*
Method for retrieving user information
*/
router.get('/getUser/:id', function(req, res) {
  Users.getUser(function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      next(err)
    }
  })
})

router.post('/addUser', function(req, res) {
  Users.addUser(req.body, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      next(err)
    }
  })
})

module.exports = router
