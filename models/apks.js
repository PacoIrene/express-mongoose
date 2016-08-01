var mongoose = require('mongoose');

var apkSchema = new mongoose.Schema({
  apkId: { type: String, unique: true, index: true },
  name: String,
  logo: String,
  description: String,
  imgList: [{type: String}]
});

module.exports = mongoose.model('Apk', apkSchema);
