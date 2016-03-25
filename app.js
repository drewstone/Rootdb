var express = require('express')
  , app = express()

var DB = require('./db.js')
var routes = require('./routes/index.js')
var users = require('./routes/users.js')

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs')

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
DB.connect('mongodb://localhost:27017/root', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
