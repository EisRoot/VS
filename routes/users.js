var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile("C:\\Users\\lab\\WebstormProjects\\VS\\public\\test.html");
});

module.exports = router;
