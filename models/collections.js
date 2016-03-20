var db = require('../db.js')

var createUsers = function(callback) {
  var db_direct = db.get()
  db_direct.createCollection("users", function(err, collection) {
    if (!err) {
      callback(null, collection)
    } else {
      callback("Error creating collection: Users", null)
    }
  })
}

module.exports = {
    createUsers: createUsers,
}
