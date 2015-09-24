var express = require('express');
var User = require('../models/user/user');
var crypto = require('crypto');
var reg=require('../business/reg');
var login=require('../business/login');
var home= require('../business/home');
/* GET home page. */
//var mysqlcon = require('../models/db/mysqlconnect');
module.exports = function (app) {
    app.get('/', function (req, res) {
        home.getallActivity(req,res);
    });

    app.get('/log', function (req, res) {
        res.render('user/signin', {
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/log', function (req, res) {
        login.login(req,res);
    });

    app.get('/reg', function (req, res) {
        res.render('user/signup', {
            //title: '注册',
            // user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/reg', function (req, res) {
        reg.reg(req,res);
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