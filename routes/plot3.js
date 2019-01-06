var express = require('express');
var fs = require('fs');


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var date = fs.readFileSync('C:\\Users\\lab\\WebstormProjects\\VS\\public\\json\\u0_plot3_conversation_week7.json');
    var jsondata = JSON.stringify(date);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(date);
});
router.post('/gpa', function (req, res, next) {
    var attr=req.body.attrList;
    var data;
    console.log(attr);
    var exec = require('child_process').exec;
    exec('python C:\\Users\\lab\\WebstormProjects\\VS\\public\\Python\\predict_center.py '+ attr+" ",function(error,stdout,stderr){
        if(stdout.length >1){
           // console.log('you offer args:',stdout);
            data=stdout;
            console.log(data);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);

        } else {
            console.log('you don\'t offer args');
        }
        if(error) {
            console.info('stderr : '+stderr);
        }
    });


});
router.post('/adjust', function (req, res, next) {
    var attr=req.body.attrList;
    var value=req.body.values;
    var id=req.body.id;
    var data;
    console.log(attr);
    console.log(value);
    console.log(id);
    var exec = require('child_process').exec;
    exec('python C:\\Users\\lab\\WebstormProjects\\VS\\public\\Python\\predict_center.py '+ attr+" "+value+" "+id+" ",function(error,stdout,stderr){
        if(stdout.length >1){
            // console.log('you offer args:',stdout);
            data=stdout;
            console.log(data);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data);

        } else {
            console.log('you don\'t offer args');
        }
        if(error) {
            console.info('stderr : '+stderr);
        }
    });


});

module.exports = router;
