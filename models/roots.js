var DB = require('../db.js');
var test = require('assert');

var addDevice = function(device, callback) {
  DB.get().collection("roots").insert(device, function(err, data) {
    if (!err) {
      callback(null, "Added new device: " + device.id)
    } else {
      callback("Error adding new device", null);
    }
  });
}

var getDevice = function(device, callback) {
  DB.get().collection("roots").find({
    $and: [{user: device.owner}, {name: device.id}]
  }, function(err, data) {
    if (!err) {
      callback(null, data);
    } else {
      callback("Error retrieving device: " + device.id, null);
    }
  });
}

var addRenter = function(device, callback) {
  DB.get().collection("roots").findAndModify({
    query: {$and: [{user: device.owner}, {id: device.id}]},
    update: {$push: {renters: device.renter}}
  }, function(err, data) {
    if (!err) {
      callback(null, data);
    } else {
      callback("Error adding a new renter to device: " + device.id, null);
    }
  });
}

var switchState = function(device, callback) {
  DB.get().collection("roots").findAndModify({
    query: {$and: [{user: device.owner}, {id: device.id}]},
    update: {$set: {state: !device.current_state}}
  }, function(err, data) {
    if (!err) {
      callback(null, data);
    } else {
      callback("Error switching state of device: " + device.id, null);
    }
  });
}


var setPower = function(device, callback) {
  DB.get().collection("roots").findAndModify({
    query: {$and: [{user: device.owner}, {id: device.id}]},
    update: {$set: {power: device.power}}
  }, function(err, data) {
    if (!err) {
      callback(null, data);
    } else {
      callback("Error changing power of device: " + device.id, null);
    }
  });
}

var setSchedule = function(device, callback) {
  DB.get().collection("roots").findAndModify({
    query: {$and: [{user: device.owner}, {id: device.id}]},
    update: {$set: {schedule: device.schedule}}
  }, function(err, data) {
    if (!err) {
      callback(null, data);
    } else {
      callback("Error changing power of device: " + device.id, null);
    }
  });
}

var status = function(device, callback) {
  DB.get().collection("roots").find({
    $and: [{user: device.owner}, {id: device.id}]},
  }, function(err, data) {
    if (!err) {
      callback(null, data.status);
    } else {
      callback("Error changing power of device: " + device.id, null);
    }
  });
}

var getAllDevices = function(user, callback){

}

module.exports = {
  addDevice: addDevice,
  getDevice: getDevice,
  addRenter: addRenter,
  switchState: switchState,
  setPower: setPower,
  setSchedule: setSchedule,
  status: status,
  getAllDevices: getAllDevices
}
