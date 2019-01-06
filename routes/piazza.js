var express = require('express');
var fs = require('fs');


var router = express.Router();
router.get('/', function (req, res, next) {
    var piazza = fs.readFileSync('E:\\Code\\visualization\\public\\json\\piazza.json');
    var jsondata = JSON.stringify(piazza);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(piazza);
});
module.exports = router;