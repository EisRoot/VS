var express = require('express');
var fs=require('fs');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var date=fs.readFileSync('C:\\Users\\lab\\WebstormProjects\\VS\\public\\json\\u0_plot3_conversation_week7.json');
var jsondata=JSON.stringify(date);
res.writeHead(200, {'Content-Type': 'application/json'});
res.end(date);
});

module.exports = router;
