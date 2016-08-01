var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var Apk = require('./models/apks');

var app = express();

mongoose.connect("mongodb://localhost:27017/apk");
mongoose.connection.on('error', function() {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

/**
 * GET /api/apks/:id
 * Returns detailed character information.
 */
app.get('/apks/:id', function(req, res, next) {
  var id = req.params.id;

  Apk.findOne({apkId: id}, function(err, apk) {
    if (err) return next(err);

    if (!apk) {
      return res.status(404).send({ message: 'Apk not found.' });
    }

    res.send(apk);
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
