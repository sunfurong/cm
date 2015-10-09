var goods = require("../models/goods/gooods");

var table="";
function getdata(){
    goods.getAll(req.session.activity.name+"_goods",function(err,goods){
        if(err){
            console.log(err);
            return;
        };
        if(goods){

        }
    })
    return table;
}
module.exports = {
    getdata:getdata
};