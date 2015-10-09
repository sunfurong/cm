var goods=require('/dir_goods');
var sort=require('/dir_sort');
var total=require('/dir_total');
function deal(req,res){
    var name= req.split('/')[2];
   switch (name){
       case "goods":
           var data=goods.getdata();
           res.json(data);
            break;
       case "sort":
           var data=sort.getdata();
           res.json(data);
           break;
       case "total":
           var data=total.getdata();
           res.json(data);
           break;
       default :
           break;
   }
}
module.exports = {
    deal: deal
}