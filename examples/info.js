/*
 http://www.atm-mi.it/it/Giromilano/Pagine/default.aspx?lvid=aecd9ac8-9040-45f7-b1547b961db0a10c-51acd293&wbt=nav&contextname=aecd9ac8-9040-45f7-b1547b961db0a10c-51acd293&vp=539&lst=0&lsi=0
 */

var http = require('http'),
    parseString = require('xml2js').parseString,
    $ = require('jquery');

var body = '<?xml version="1.0" encoding="ISO-8859-1" ?><stoprequest><code>12174</code><descr>Via Vitruvio</descr><linename>1</linename><lng>0</lng></stoprequest>';
var postRequest = {
  host: 'www.atm-mi.it',
  path: '/gmtools/xmllvstop.asp',
  port: 80,
  method: 'POST',
  headers: {
    'Content-Length': Buffer.byteLength(body, 'utf8'),
    'Referer': 'http://www.atm-mi.it/'
  }
};

var req = http.request(postRequest, function(res) {
  var buffer = '';
  res.on('data', function(data) { buffer += data; });
  res.on('end', function(data) { 
    if (data) buffer += data;
    parseString(buffer, function (err, result) {
      var info = $(result.stop.stopinfo[0]).find('.tblttinfo').html();
      if (!info) {
	    console.log('no buses going');
      } else {
	    console.log(info);
      }
    });
  });
});

req.write(body);
req.end();
