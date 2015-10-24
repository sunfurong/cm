var Cards = require("../models/cards/cards");
var Goods = require("../models/goods/goods");
function getdata(req,res){
    req.session.activity = req.session.activity;
    //如何获取用户名？
    //根据用户的名字获取该ssm用户在goods表中对应的商品品牌的名字，作为获取任务表表名的一部分
    req.session.ssmname=req.session.ssmname;
    req.session.activity=req.session.activity;
    console.log(req.session.activity + "_goods"+"///"+'ssmname'+"///"+req.session.ssmname);
    Goods.getSome(req.session.activity + "_goods",'ssmname',req.session.ssmname,function(err,good){
        if(err){
            console.log(err);
            return;
        };
        if(good){
            console.log(req.session.activity + "_goods"+"_"+good[0].name)
            Cards.getAll(req.session.activity + "_goods"+"_"+good[0].name, function (err, cards) {
                if (err) {
                    console.log(err);
                    return;
                };
                if (cards) {
                    var data = {
                        cards: cards
                    };
                    res.json(data);
                }
            });
        }
    })
};
module.exports = {
    getdata: getdata
};
