var activity = require("../models/activity/activity");
var goods = require("../models/goods/goods");


function reg(req,res){
    //console.log("sdsd:////"+req.session.activity);
    req.session.activity=req.session.activity;
    goods.getAll(req.session.activity+"_goods",function(err,g){
        if(err){
            console.error(err);
            return
        };
        if(g){
            for(var i=0;i< g.length;i++){
                if(g[i].ssmname==req.body.username && g[i].ssmpassword==req.body.password){
                        console.log("ssm signin success!");
                        return res.redirect('/ssm');
                }
            }
        }
    })
}
module.exports = {
    reg: reg
}