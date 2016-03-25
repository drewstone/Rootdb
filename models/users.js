var DB = require('../db.js')
var db = DB.get()

/*
Method for adding a new user into the application. Letting MongoDB handle
user authentication and a custom table for storing public user information
*/
var addUser = function(user, callback) {
  addUserPrivate({
    username: user.username,
    password: user.password
  }, function(err, account) {
    if (!err) {
      delete user.password
      addUserPublic(user, function(err, data) {
        if (!err) {
          callback(null, data)
        } else {
          callback("Error adding public information of user", null)
        }
      })
    } else {
      callback("Error adding account information of user", null)
    }
  })
}

/*
Method for adding user accounts into the database. This only includes a
username and password for future authentication
*/
var addUserPrivate = function(user, callback) {
  db.addUser(user.username, user.password, function(err, data) {
    if (!err) {
      callback (null, "Success")
    } else {
      callback("Error adding new user account", null)
    }
  })
}

/*
Method to add public information about a user. This includes
username, full name, and email. Can extend to include more data.
*/
var addUserPublic = function(user, callback) {
  db.collection("users").insertOne(user, function(err, data) {
    if (!err) {
      callback(null, "Success")
    } else {
      callback("Error adding user information", null)
    }
  })
}

var getUser = function(user, callback) {
  db.collection("users").find({name: user}).toArray(function(err, data) {
    if (!err) {
      callback(null, data)
    } else {
      callback("Error retrieving user: " + user.fullName, null)
    }
  })
}

var getAllUsers = function(callback) {
  db.collection("users").find().toArray(function(err, data) {
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
