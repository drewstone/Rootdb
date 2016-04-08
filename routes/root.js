var express = require('express')
  , router = express.Router()

var db = require('../db.js')
var Root = require('../models/roots.js')

router.post('/switch/:id', function(req, res) {
  Root.switchState({
    user: req.body.user,
    id: req.params.id,
  }, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      next(err);
    }
  });
});

router.post('/setPower/:id', function(req, res) {
  Root.setPower({
    user: req.body.user,
    id: req.params.id,
    power: req.body.power_change,
  }, function(err, data) {
    if (!err) {
      res.send(data)
    } else {
      next(err);
    }
  });
});

router.post('/setSchedule/:id', function(req, res) {
  Root.setSchedule({
    user: req.body.user,
    id: req.params.id,
    schedule: req.body.schedule
  }, function(err, data) {
    if (!err) {
      res.send(data)
    } else {
      next(err);
    }
  });
});

router.get('/status/:id', function(req, res) {
  Root.status({
    user: req.body.user,
    id: req.params.id,
  }, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      next(err);
    }
  })
});

module.exports = router
