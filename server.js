var express = require('express'),
    app = express(),
    routes = require('./routes');

app.get('/lines/:number', routes.line); 

var port = process.env.PORT || 3000;
app.listen(port, function() { console.log('listening on ' + port); });
