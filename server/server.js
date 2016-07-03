var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("Hello Handsome!")
})


app.listen(3000, function() {
	console.log("Server is running at port 3000");
});