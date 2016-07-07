var express =  require('express');
var router = express.Router();

//Databases
var database = ["https://www.tablethotels.com", "https://www.google.com", "http://www.festus.me", "https://www.twitter.com", "https://www.yahoo.com","https://www.cnn.com"];

//SEND URLS to the app
router.get('/bookmarks', function(req, res){
	req.body
	res.send(database);
});


//POST for New URLS
router.post('/addbookmark', function(req, res) {
	req.on("data", function(data_) {
		var url = "1 " + data_;
		database.push(url.split(" ").slice(1).join(" "));
      });
	console.log("Database data: ", database);
	res.send(database);
})


module.exports = router;
