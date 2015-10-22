var goods = require("../models/goods/goods");

var table="";
function getdata(req,res){
    req.session.activity=req.session.activity;
    goods.getAll(req.session.activity+"_goods",function(err,goods){
        if(err){
            console.log(err);
            return;
        };
        if(goods){
            var data={
                goods:goods
            };
            res.json(data);
        }

    });

}

function add(req,res){
    var GOODS=new goods({
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
    req.session.activity=req.session.activity;
    goods.get(req.session.activity+"_goods",GOODS.name,function(err,g){
        if(err){
            console.error(err);
            return
        };
        if(g){
            console.log("has");
            return;
        };
        console.log("get success");
        GOODS.save(req.session.activity+"_goods",function(err,goods){
            if (err) {
                console.log(err);
                return;
            };
            if(goods){
                console.log("add sucess");
                res.redirect('/director');
            }

        })
    })
}
module.exports = {
    getdata:getdata,
    add:add
};