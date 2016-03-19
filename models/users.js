var db = require('../db.js')

exports.addUser = function(user, callback) {
  var collection db.get().collection('user')
  collection.insertOne(user, function(err, data) {
    if (!err) {
      callback(null, "Success")
    } else {
      callback("Error adding user", null)
    }
  })
}

exports.getUser = function(user, callback) {
  var collection = db.get().collection('users')
  collection.find({name: user}).toArray(function(err, data) {
    if (!err) {
      callback(null, data)
    } else {
      callback("Error retrieving user: " + user.fullName, null)
    }
  })
}

exports.getAllUsers = function(callback) {
  var collection = db.get().collection('users')
  collection.find().toArray(function(err, data) {
    if (!err) {
      callback(null, data)
    } else {
      callback("Error getting all users", null)
    }
  });
}
