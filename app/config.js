var path = require('path');
var crypto = require('crypto');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});

var db2 = require('bookshelf')(knex);

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/data/db');

exports.mongoose = mongoose;

exports.db = mongoose.connection;

exports.db.on('error', console.error.bind(console, 'connection error:'));
exports.db.once('open', function() {
  console.log('Mongoose connected to database')
});

var Schema = mongoose.Schema;

// exports.usersSchema = new Schema({
//   id: ObjectId,
//   username: String,
//   password: String,
//   timestamps: Date
// });

var linksSchema = new Schema({
  id: Schema.Types.ObjectId,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: Date
});

exports.linksSchema = linksSchema;

exports.linksSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);

  this.code = shasum.digest('hex').slice(0, 5);
  console.log('Link model: ', this);

  next(); 
});

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

db2.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db2.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

exports.db2 = db2;

