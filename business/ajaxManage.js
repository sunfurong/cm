var goods=require('./dir_goods');
var sort=require('./dir_sort');
var total=require('./dir_total');
var cards = require('./cards');
function deal(req,res){
    var name= req.url.split('/')[2];
   switch (name){
       case "goods":
           //console.log(233);
          goods.getdata(req,res);
           //console.log(data);
           //res.json(data);
            break;
       case "sort":
           var data=sort.getdata();
           res.json(data);
           break;
       case "total":
           var data=total.getdata();
           res.json(data);
           break;
       case "cards":
           console.log("ajax/cards");
           cards.getdata(req,res);
           break;
       default :
           break;
   }
}
module.exports = {
    deal: deal
}