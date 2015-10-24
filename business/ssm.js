var activity = require("../models/activity/activity");
var goods = require("../models/goods/goods");


function login(req,res){
    //console.log("sdsd:////"+req.session.activity);
    req.session.activity=req.session.activity;
//登录
    goods.getAll(req.session.activity+"_goods",function(err,g){
        if(err){
            console.error(err);
            return
        };
        if(g){
            for(var i=0;i< g.length;i++){
                if(g[i].ssmname==req.body.username && g[i].ssmpassword==req.body.password){
                        console.log("ssm signin success!");
                        req.session.ssmname=req.body.username;
                        return res.redirect('/ssm');
                }
            }
        }
    })
}
module.exports = {
    login: login
}