var request = require('request'),
    $ = require('jquery');

// they do not encode like the rest of the world does
function encode(string) {
  return string
    .replace(/\|/g, '%7C')
    .replace(/ /g, '+');
}

function get(cb) {
  request('http://www.atm-mi.it/it/Giromilano/Pagine/default.aspx', function(err, res, body) {
    var lines = $(body)
	  .find('.dplinee option')
	  .map(function() { return $(this).attr('value'); })
	  .get()
	  .map(function(line) {
	    var splitted = line.split('|');
	    return {
	      number: splitted[0],
	      direction: splitted[1],
	      name: splitted[3],
	      encoded: encode(line)
	    };
	  });
    cb(lines);
  });
};

module.exports = function(lineNumber, cb) { 
  get(function(lines) {
    cb(lines.filter(function(line) {
      return line.number == lineNumber;
    }));
  }); 
};
