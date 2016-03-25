var users = require('../../models/users.js')
var DB    = require('../../db.js')
var assert = require('assert')
var db = DB.get()

describe("Users", function(done) {
  // Establish connection with the database before any tests
  before(function(done) {
    DB.connect("mongodb://localhost:27017/test", done)
  })

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) {
        return done(err)
      }
    })
  })

  it("Should do this", function(done) {

  });

  afterEach(function(done) {

  })
})
