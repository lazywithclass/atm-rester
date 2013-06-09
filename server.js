var express = require('express'),
    app = express(),
    routes = require('./routes');

app.get('/lines/:number', routes.lineBothWays); 
app.get('/lines/:number/:direction', routes.singleLine); 

var port = process.env.PORT || 3000;
app.listen(port, function() { console.log('listening on ' + port); });
