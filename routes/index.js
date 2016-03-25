var express = require('express')
  , router = express.Router();

var db = require('../db.js');
var Index = require('../models/index.js');
router.get('/', function(req, res) {
  res.render('login.ejs');
});

router.get('/register',function(req,res,next){
	res.render('login.ejs', {title: 'ROOT'});
});




module.exports = router
