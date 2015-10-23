var goods = require("../models/goods/goods");
var Cards = require("../models/cards/cards");
var Activity = require("../models/activity/activity");
var table = "";
function getdata(req, res) {
    req.session.activity = req.session.activity;
    goods.getAll(req.session.activity + "_goods", function (err, goods) {
        if (err) {
            console.log(err);
            return;
        }
        ;
        if (goods) {
            var data = {
                goods: goods
            };
            res.json(data);
        }

    });

}

function add(req, res) {
    var GOODS = new goods({
        name: req.body.name,
        ssmname: req.body.ssmname,
        ssmpassword: req.body.ssmpassword,
        ssmphone: req.body.ssmphone,
        goodsaddress: req.body.goodsaddress,
        bsmname: req.body.bsmname,
        bsmpassword: req.body.bsmpassword,
        bsmphone: req.body.bsmphone,
        tasknum: req.body.tasknum,
    })
    req.session.activity = req.session.activity;
    goods.get(req.session.activity + "_goods", GOODS.name, function (err, g) {
        if (err) {
            console.error(err);
            return
        }
        ;
        if (g) {
            console.log("has");
            return;
        }
        ;
        console.log("get success");
        GOODS.save(req.session.activity + "_goods", function (err, good) {
            if (err) {
                console.log(err);
                return;
            };
            if (good) {
                //添加完品牌之后，给该品牌添加对应的任务。
                goods.createGoodTaskTable(req.session.activity + "_goods" + "_" + GOODS.name, function (err, cards) {
                    if (err) {
                        console.log("create card table error:" + err);
                        return;
                    }
                    if (cards) {
                        //根据req.session.activity找到活动的;cardnum:activity.id+_goods.id+_cardid
                        Activity.get(req.session.activity, function (err, activity) {
                            if (err) {
                                console.log("获取活动信息出错")
                                return;
                            }
                            if (activity) {
                                goods.get(req.session.activity + "_goods",good.name,function(e,g){
                                    if(e){
                                        console.log("get goods error:" + e);
                                        return;
                                    }
                                    if(g){
                                        for (var i = 0; i < good.tasknum; i++) {
                                             var card=new Cards({
                                                 cardnum: activity.id+"_"+g.id+"_"+i,
                                                 cusname: "",
                                                 cusphone: 0,
                                                 cusaddress:"",
                                                 state:0,
                                             });
                                             card.save(req.session.activity+"_goods"+"_"+GOODS.name,function(err,card){
                                                 if(err){
                                                     console.log('insert card err:'+err);
                                                     return;
                                                 }
                                                 if(card){
                                                     console.log('insert card success');
                                                 }
                                             })
                                        }
                                        ////按照任务数，生成固定数量的卡片编号，存入表格
                                        console.log("create card table success!");
                                        res.redirect('/director');
                                    }
                                })

                            }
                        });

                    }
                });
            }

        })
    })
}
module.exports = {
    getdata: getdata,
    add: add
};