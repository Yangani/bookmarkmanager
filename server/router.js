var express    = require('express');
var router     = express.Router();
var connection = require('./database/connection');
var bookmarks  = require('./database/models');

//Initialize connection to MySQL DB
connection.init();

//Get bookmarks from the database
router.get('/bookmarks', function(req, res){
	bookmarks.get(res);
});

//POST for New bookmarks
router.post('/addbookmark', function(req, res) {
	req.on("data", function(data_) {
		data_ = JSON.parse(data_);
		bookmarks.add(data_, res);
     });
})


//Edit a Bookmark 
router.put('/deletebookmark', function(req, res) {
	req.on("data", function(data_) {
		data_ = JSON.parse(data_);
		bookmarks.delete(data_, res)
    });
})

//Delete Bookmark 
router.delete('/deletebookmark', function(req, res) {
	req.on("data", function(data_) {
		data_ = JSON.parse(data_);
		bookmarks.delete(data_, res)
    });
})


module.exports = router;
