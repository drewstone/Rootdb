var express = require('express')
  , router = express.Router();


var request = require('request');

var db = require('../db.js');
var Index = require('../models/index.js');
router.get('/', function(req, res) {
  res.render('login.ejs');
});

router.get('/register',function(req,res,next){
	res.render('login.ejs', {title: 'ROOT'});
});

router.get('/webapp',function(req,res,next){
	res.render('rootapp.ejs', {title: 'WebApp'})
});

router.post('/turnOn',function(req,res,next){
	var deviceID = '390031000347343138333038';
	var accessToken = '780317b0799621815b3d1aed64642ed65a27672c';
	var url = 'https://api.particle.io/v1/devices/' + deviceID + '/relay?access_token=' + accessToken;
    request.post(
      url, 
      {form:{args:'on'}},
      function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log(error);
        }
        else{
          console.log('successful');
        }
      }
    );
});

router.post('/turnOff',function(req,res,next){
	var deviceID = '390031000347343138333038';
	var accessToken = '780317b0799621815b3d1aed64642ed65a27672c';
	var url = 'https://api.particle.io/v1/devices/' + deviceID + '/relay?access_token=' + accessToken;
    request.post(
      url, 
      {form:{args:'off'}},
      function (error, response, body) {
        if (error || response.statusCode != 200) {
            console.log(error);
        }
        else{
          console.log('successful');
        }
      }
    );
});




module.exports = router
