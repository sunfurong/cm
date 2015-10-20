var activity = require("../models/activity/activity");

var director;
var password;
function reg(req,res){
    //console.log("sdsd:////"+req.session.activity);
    req.session.activity=req.session.activity;
    activity.get(req.session.activity, function (err, activity) {
        if (err) {
            console.log("AAAAAAA+" + err);
            return;
        }
        if (activity) {
            console.log("活动已存在");
            if(req.body.username==activity.manage_name && req.body.password==activity.manage_pawd){
                return res.redirect('/director');
            }else{
                return;
            }

        }
    });
}
module.exports = {
    reg: reg
}