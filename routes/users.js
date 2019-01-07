var express = require('express');
var router = express.Router();
var pro_path='/usr/local/';



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(pro_path+"VS/public/test.html");
});

module.exports = router;
