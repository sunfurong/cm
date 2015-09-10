var express = require('express');
/* GET home page. */

module.exports = function(app){
	app.get('/',function(req,res){
		 res.render('index', { title: 'Express' });
	});
	app.get('/sf', function (req, res) {
  res.send('hello,world!');
});
};
