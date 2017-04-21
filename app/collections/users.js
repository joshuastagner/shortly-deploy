// NOTE: this file is not needed when using MongoDB
var db = require('../config');
var User = require('../models/user');

var Users = new db.db2.Collection();

Users.model = User;

module.exports = Users;