var express =  require('express');
var router = express.Router();

router.use(function(req, res, next){
	console.log(req);
	next();
})

router.get('/bookmarks', function(req, res){
	res.send("bookmarks")
});

module.exports = router;
