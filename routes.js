var lineHash = require('./lib/line-hash'),
    lineDetails = require('./lib/line-details'),
    getLines = require('./lib/get-lines'),
    xmldoc = require('xmldoc');

function format(stop, index) {
  stop.attr.description = stop.attr.sdescr;
  delete stop.attr.sdescr;
  stop.attr.code = stop.attr.scode.trim();
  delete stop.attr.scode;
  stop.attr.position = index + 1;
  return stop.attr;
}

module.exports.singleLine = function(req, res) {
  lineHash(req.params.number, req.params.direction, function(hash) {
    lineDetails(hash, function(details) {
      var document = new xmldoc.XmlDocument(details);
      var stops = document.childrenNamed('stop').map(format);
      res.json(stops);
    });
  });
};

module.exports.lineBothWays = function(req, res) {
  getLines(req.params.number, function(lines) {
    res.json(lines);
  });
};
