var express = require('express');
/* GET home page. */

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Express'
		});
	});
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册',
			// user: req.session.user,
			// success: req.flash('success').toString(),
			 //error: req.flash('error').toString()
		});
	});
	// app.post('/reg', function(req, res) {});
	// app.get('/login', function(req, res) {
	// 	res.render('login', {
	// 		title: '登录'
	// 	});
	// });
	// app.post('/login', function(req, res) {});
	// app.get('/logout', function(req, res) {});
};