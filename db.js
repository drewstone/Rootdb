var MongoClient = require('mongodb').MongoClient
var async = require('async')

var state = {
  db: null,
}

var connect = function(url, done) {
  if (state.db) return done()

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

var get = function() {
  return state.db
}

var close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}

var drop = function(done) {
  if (state.db) {
    state.db.collections(function(err, collections) {
      async.each(collections, function(collection, callback) {
        if (collection.collectionName.indexOf('system') === 0) {
          return callback()
        }
        collection.remove(callback)
      }, done)
    })
  }
}

var fixtures = function(data, done) {
  var db = state.db
  if (!db) {
    return done(new Error('Missing database connection.'))
  }

  var names = Object.keys(data.collections)
  async.each(name, function(name, cb) {
    db.createCollection(name, function(err, collection) {
      if (err) return cb(err)
      collection.insert(data.collections[name], cb)
    })
  }, done)
}

module.exports = {
  connect: connect,
  get: get,
  close: close,
  drop: drop,
  fixtures: fixtures,
}
