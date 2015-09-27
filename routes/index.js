var express = require('express');
var User = require('../models/user/user');
var crypto = require('crypto');
var reg=require('../business/reg');
var login=require('../business/login');
var home= require('../business/home');
var activity=require('../business/activity');
/* GET home page. */
//var mysqlcon = require('../models/db/mysqlconnect');
module.exports = function (app) {

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
    });

    //系统首页
    app.get('/', function (req, res) {
        home.getallActivity(req,res);
    });
    //活动首页
    app.get('/activity/*',function(req,res){
        var activity_name=req.url.split("/")[2];
        res.render('activity/index',{})
    });
    //后台管理
    app.get('/mgactivity',function(req,res){
        res.render('manage/mgactivity',{

        })
    });

    app.get('/mguser',function(req,res){
        res.render('manage/mguser',{

        })
    });

    app.get('/mgfile',function(req,res){
        res.render('manage/mgfile',{

        })
    });

    app.get('/mgstatistics',function(req,res){
        res.render('manage/mgstatistics',{

        })
    });

    //用户页面
    app.get('/bsm',function(req,res){

        res.render('bsm/index',{})
    });

    app.get('/director',function(req,res){
        res.render('director/index',{})
    });

    app.get('/ssm',function(req,res){
        res.render('ssm/index',{})
    });
    //活动注册
    app.post('/activity_reg',function(req,res){
        //console.log(req.body);
        activity.reg(req,res);

    });;
};