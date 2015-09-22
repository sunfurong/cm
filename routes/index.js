var express = require('express');
var User = require('../models/user/user.js');
var crypto = require('crypto');
/* GET home page. */
//var mysqlcon = require('../models/db/mysqlconnect');
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Express'
        });
    });
    app.get('/log', function (req, res) {
        res.render('user/signin', {
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/log', function (req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        User.get(req.body.name, function (err, user) {
            if (!user) {
                req.flash('error', '用户不存在!');
                return res.redirect('/login');
            }
            console.log(user.password);
            console.log(password);
            if (user.password != password) {

                req.flash('error', '密码错误!');
                return res.redirect('/login');
            }

            req.session.user = user;
            req.flash('success', '登陆成功!');
            if(user.username == 'zhuyun'){
                return res.redirect('/manage');
            }
            res.redirect('/');
        });
    })
    app.get('/reg', function (req, res) {
        res.render('user/signup', {
            //title: '注册',
            // user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/reg', function (req, res) {
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
            activename: req.body.activename
        });
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
    app.get('/manage',function(req,res){
        //打开后台管理界面，也就是朱昀使用的
        res.render('manage/manage', {

        });
    });
    app.get('/activity',function(req,res){
        //普通用户打开对应活动的界面
    })
};