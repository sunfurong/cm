var activity=require("../models/activity/activity");
function reg(req,res){
    var activityName=req.body.name;
    var activityDirector=req.body.director;
    var activityAddress=req.body.address;
    var activityStart_time=req.body.start_time;
    var activityEnd_time=req.body.end_time;
    var activityRemark = req.body.remark;
    var newActivity=new activity({
        name :activityName,
        director:activityDirector,
        address:activityAddress,
        start_time:activityStart_time,
        end_time:activityEnd_time,
        remark:activityRemark,
    });
    activity.get(activityName,function(err,activity){
        if(err){
            console.log("AAAAAAA+"+err);
            return;
        }
        if(activity){
            console.log("活动已存在") ;
            return res.redirect('/reg');
        }
        //console.log(newActivity);
        newActivity.save(function(err,activity){
            console.log(err);
            //return res.redirect('/reg');
            //console.log(activity.activityName);
            //req.flash('success', '注册成功!');
            res.redirect('/');
        });
    });
}
module.exports={
    reg:reg
}