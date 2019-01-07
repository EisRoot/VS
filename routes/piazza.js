var express = require('express');
var fs = require('fs');
var pro_path='/usr/local/';


var router = express.Router();
router.get('/', function (req, res, next) {
    var piazza = fs.readFileSync(pro_path+'VS/public/json/piazza.json');
    var jsondata = JSON.stringify(piazza);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(piazza);
});
module.exports = router;