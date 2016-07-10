var express =  require('express');
var router = express.Router();

//Databases
var database = {
	"https://www.tablethotels.com" : "Tablet Hotels", 
	"https://www.google.com": "Google",
	"http://www.festus.me" : "My Portfolio",
	"https://www.twitter.com": "twitter",
	"https://www.yahoo.com": "Yahoo",
	"https://www.cnn.com" : "CNN"
}

//SEND URLS to the app
router.get('/bookmarks', function(req, res){
	res.send(database);
});


//POST for New URLS
router.post('/addbookmark', function(req, res) {
	req.on("data", function(data_) {
		data_ = JSON.parse(data_);
		database[data_.url] = data_.title;
      });
	console.log("Database data: ", database);
	res.send(database);
})

//Delete URL 
router.post('/deletebookmark', function(req, res) {
	req.on("data", function(data_) {
		data_ = JSON.parse(data_);
		delete database[data_];
      });
	res.send("Delete Successful");
})

module.exports = router;
