var DB = require('../db.js')

/*
Method for adding a new user into the application. Letting MongoDB handle
user authentication and a custom table for storing public user information
*/
var addUser = function(user, callback) {
  DB.get().collection("users").insert(user, function(err, data) {
    if (!err) {
      callback(null, data);
    } else {
      callback("Error inserting new user", null);
    }
  })
}

var getUser = function(user, callback) {
  db.users.find({name: user}).toArray(function(err, data) {
    if (!err) {
      callback(null, data)
    } else {
      callback("Error retrieving user: " + user.fullName, null)
    }
  })
}

var getAllUsers = function(callback) {
  db.users.find().toArray(function(err, data) {
    if (!err) {
      callback(null, data)
    } else {
      callback("Error getting all users", null)
    }
  });
}

/*
Method for authenticating users based on the provided username and password
*/
var authenticateUser = function(user, callback) {
  db.authenticate(user.username, user.password, function(err, data) {
    if (!err) {
      callback(null, data)
    } else {
      callback("Error authenticating user", null);
    }
  })
}

module.exports = {
  addUser: addUser,
  getUser: getUser,
  allUsers: getAllUsers,
  loginUser: authenticateUser,
}
