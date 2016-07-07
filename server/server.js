var express = require('express');
var app = express();
var router = require('./router');

//Databases
var database = [];

// express will look in this folder for static content 
app.use(express.static('public'));

app.use('/api', router);

app.listen(3000, function() {
	console.log("Server is running at port 3000");
});