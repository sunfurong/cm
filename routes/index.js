var express = require('express');
var User = require('../models/user/user.js');
var crypto = require('crypto');
/* GET home page. */
var mysqlcon = require('../models/db/mysqlconnect');
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
			 success: req.flash('success').toString(),
			 error: req.flash('error').toString()
		});
	});
	 app.post('/reg', function(req, res) {
		 //mysqlcon.handleError()
		 //var sql_string="insert into cm_user(username,password,email) value('2','2','2@qq.com')";
		 //mysqlcon.query(sql_string,function(err,rows){
			// console.log(err);
		 //})
		 var name = req.body.name,
			 password = req.body.password,
			 password_re = req.body['password-repeat'];
		 if (password_re != password) {
			 req.flash('error', '两次输入的密码不一致!');
			 return res.redirect('/reg');
		 }
		 var md5 = crypto.createHash('md5'),
			 password = md5.update(req.body.password).digest('hex');
		 var newUser = new User({
			 name: name,
			 password: password,
			 email: req.body.email
		 });
		 //User.get(newUser.name);
		 User.get(newUser.name, function (err, user) {
			 if (err) {
				 req.flash('error', err);
				 return res.redirect('/');
			 }
			 if (user) {
				 req.flash('error', '用户已存在!');
				 return res.redirect('/reg');
			 }

			 newUser.save(function (err, user) {

				 if (err) {
                     console.log(err);
					 req.flash('error', err);
					 return res.redirect('/reg');
				 }
                 console.log(user.username);
				 req.session.user = user;
				 req.flash('success', '注册成功!');
				 res.redirect('/');
			 });
		 });
	 });
	// app.get('/login', function(req, res) {
	// 	res.render('login', {
	// 		title: '登录'
	// 	});
	// });
	// app.post('/login', function(req, res) {});
	// app.get('/logout', function(req, res) {});
};