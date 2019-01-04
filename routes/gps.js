var express = require('express');
var fs = require('fs');


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var date = fs.readFileSync('E:\\Code\\visualization\\public\\json\\gps.json');
    var jsondata = JSON.stringify(date);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(date);
});
router.get('/map', function (req, res, next) {
    var date = fs.readFileSync('E:\\Code\\visualization\\public\\json\\geo2.json');
    var jsondata = JSON.stringify(date);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(date);
});
module.exports = router;