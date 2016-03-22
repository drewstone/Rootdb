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
  Users.addUser({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    zipcode: req.body.zipcode
  }, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      next(err)
    }
  })
})

module.exports = router
