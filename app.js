var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var DB = require('./db.js');
var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var root = require('./routes/root.js');
var scheduler = require('./scheduler.js');

app.use(express.static(__dirname + '/views'));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', routes);
app.use('/users', users);
app.use('/root', root);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Connect to Mongo on start
DB.connect('mongodb://162.243.97.29/rootDB', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...');

      // DB Collection creation - will find better place soon

      DB.get().createCollection("users", function(err, data) {
        if (!err) {
          console.log("-> Collection 'users' created");
        }
      });
      DB.get().createCollection("roots", function(err, data) {
        if (!err) {
          console.log("-> Collection 'roots' created");
        }
      });
    });
  }
});
