var express = require('express')
  , app = express()

var db = require('./db')
var routes = require('./routes/index.js')
var users = require('./routes/users.js')

app.use(express.static(__dirname + '/pages'));
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use('/', routes)
app.use('/users', users)
app.us('/login', )

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/root', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
