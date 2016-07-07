var express =  require('express');
var router = express.Router();

router.use(function(req, res, next){
	console.log(req);
	next();
})

router.get('/bookmarks', function(req, res){
	req.body
	res.send("bookmarks");
});


module.exports = router;
