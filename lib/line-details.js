var request = require('request');

module.exports = function(fname, cb) {
  request('http://www.atm-mi.it/gmtools/xmlbwpoints.asp?fname=' + fname, function(err, res, body) {
    cb(body);
  });
};
