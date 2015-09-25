/**
 * Created by sunfurong on 15/9/23.
 */
var Activity = require('../models/activity/activity');
function getallActivity(req,res){
    Activity.getAll(function(err,activity){
        if (err) {
            //req.flash('error', err);
            //return res.redirect('/');
            console.log(err);
        }
        if (activity) {
            if(activity.length>0){
                var html='';
                var num=parseInt(activity.length/2);
                for(var i=0;i<num;i++){
                    html=html+" <div class='row' style='height: 50px;width: 100%'></div>"
                        +"<div class='row' style='height: 300px;width: 100%'>"
                        +"<div class='col-md-1 col-xs-1' style='background-color: white;height: 300px'></div>"
                        +"<div class='col-md-4 col-xs-4' style='background-color: aliceblue;height: 300px'><p>"+activity[i*2].name+"</p></div>"
                        +"<div class='col-md-2 col-xs-1' style='background-color: white;height: 300px'></div>"
                        +"<div class='col-md-4 col-xs-4' style='background-color: aliceblue;height: 300px;'><p>"+activity[i*2+1].name+"</p></div>"
                        +"<div class='col-md-1 col-xs-1' style='background-color: white;height: 300px;'></div>"
                        +"</div>";
                }
                if(activity.length%2==1){
                    html=html+" <div class='row' style='height: 50px;width: 100%'></div>"
                        +"<div class='row' style='height: 300px;width: 100%'>"
                        +"<div class='col-md-1 col-xs-1' style='background-color: white;height: 300px'></div>"
                        +"<div class='col-md-4 col-xs-4' style='background-color: aliceblue;height: 300px'><p>"+activity[activity.length-1].name+"</p></div>"
                        +"<div class='col-md-2 col-xs-1' style='background-color: white;height: 300px'></div>"
                        +"<div class='col-md-4 col-xs-4' style='background-color: aliceblue;height: 300px;'><p>敬请期待</p></div>"
                        +"<div class='col-md-1 col-xs-1' style='background-color: white;height: 300px;'></div>"
                        +"</div>";
                }
                res.render('index', {
                    //将HTML代码返回
                    content:html
                });
            }
        }

    })
}

//function showAll(req,res){
//    var html=getallActivity();
//    console.error("AAAAAAA")
//    console.log(html);
//    res.render('index', {
//        //将HTML代码返回
//        content:html
//    });
//    //return
//}
module.exports={
    getallActivity:getallActivity
    //showAll:showAll
}