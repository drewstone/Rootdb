var express = require('express')
  , app = express()

var bodyParser = require('body-parser')
var DB = require('./db.js')
var routes = require('./routes/index.js')
var users = require('./routes/users.js')

app.use(express.static(__dirname + '/views'));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', routes)
app.use('/users', users)

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

// Connect to Mongo on start
DB.connect('mongodb://104.236.195.8:27017/rootDB', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      var db = DB.get();
      db.createCollection("users", function(err, data) {
        if (!err) {
          console.log("success");
        }
      });
      console.log('Listening on port 3000...')
    })
  }
})
