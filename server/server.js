var express = require('express');
var app = express();
var router = require('./router');
var port = process.env.PORT || 3000;

// express will look in this folder for static content 
app.use(express.static('public'));

app.use('/api', router);

app.listen(port, function() {
	console.log("Server is running at port 3000");
});