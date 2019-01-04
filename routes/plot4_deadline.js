var express = require('express');
var fs=require('fs');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var date=fs.readFileSync('C:\\Users\\lab\\WebstormProjects\\VS\\public\\json\\plot4_deadline_day.json');
var jsondata=JSON.stringify(date);
res.writeHead(200, {'Content-Type': 'application/json'});
res.end(date);
});
router.post('/x',function (req, res, next) {
    var attr_id=req.body.attr_id;
    console.log(attr_id);
})
router.get('/image',function (req, res, next) {
    res.sendFile()
})
module.exports = router;
