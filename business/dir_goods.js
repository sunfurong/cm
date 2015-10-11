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
            table=" <table border='10' valign='center' style='margin:auto;width: 90%;font-size: 20px;'>"+
            "<thead>"+
            "<tr>"+
            "<th>序号</th>"+
            "<th>品牌</th>"+
            "<th>任务数</th>"+
            "<th>商户</th>"+
            "<th>商户密码</th>"+
            "<th>业务员</th>"+
            "<th>业务员密码</th>"+
            "<th>修改</th>"+
            "</tr>"+
            "</thead>";

            for(var i=0;i<goods.length;i++){
                table=table+" <tr>"+
                    "<td>"+i+"</td>"+
                    "<td>"+goods[i].name+"</td>"+
                    "<td>"+goods[i].tasknum+"</td>"+
                    "<td>"+goods[i].bsmname+"</td>"+
                    "<td>"+goods[i].bsmpassword+"</td>"+
                    "<td>"+goods[i].ssmname+"</td>"+
                    "<td>"+goods[i].ssmpassword+"</td>"+
                    "<td>"+"</td>"+
                    "</tr>";
            }
            var data={
                table:table+"</table>"
            };
            res.json(data);
        }

    });

}
module.exports = {
    getdata:getdata
};