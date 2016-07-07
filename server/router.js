var express =  require('express');
var router = express.Router();

//Databases
var database = [1, 3, 5, 6, 6,7];

// router.use(function(req, res, next){
// 	next();
// })

router.get('/bookmarks', function(req, res){
	req.body
	res.send(database);
});

router.post('/addbookmark', function(req, res) {
	req.on("data", function(data_) {
		var url = "1 " + data_;
		database.push(url.split(" ").slice(1).join(" "));
      });
	console.log("Database data: ", database);
	res.send(database);
})


module.exports = router;
