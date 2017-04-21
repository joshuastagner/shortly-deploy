var mongooseUtils = require('../config');
var mongoose = require('mongoose'); 
var crypto = require('crypto');

var Link = mongoose.model('Link', mongooseUtils.linksSchema);

var Schema = mongoose.Schema;

var linksSchema = new Schema({
  id: Schema.Types.ObjectId,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: Date
});

linksSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);

  this.code = shasum.digest('hex').slice(0, 5);
  console.log('Link model: ', this);

  next(); 
});



module.exports = Link;