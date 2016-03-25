var DB = require('../db.js')
var db = DB.getDB()

var createUsers = function(callback) {
  db.createCollection("users", function(err, collection) {
    if (!err) {
      callback(null, collection)
    } else {
      callback("Error creating collection: Users", null)
    }
  })
}

var deleteUsers = function(callback) {
  db.dropCollection("users", function(err, result) {
    if (!err) {
      callback(null, result)
    } else {
      callback("Error dropping database: users", null)
    }
  })
}

var createDevices = function(callback) {
  db.createCollection("roots", function(err, collection) {
    if (!err) {
      callback(null, collection)
    } else {
      callback("Error creating collection: Roots", null);
    }
  })
}

module.exports = {
    createUsers: createUsers,
    deleteUsers: deleteUsers,
}
