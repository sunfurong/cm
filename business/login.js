var User = require('../models/user/user.js');
var crypto = require('crypto');

function login(req,res){
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    User.get(req.body.name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/login');
        }
        console.log(user.password);
        console.log(password);
        if (user.password != password) {

            req.flash('error', '密码错误!');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.flash('success', '登陆成功!');
        if(user.username == 'zhuyun'){
            return res.redirect('/manage');
        }
        res.redirect('/');
    });
}
module.exports={
    login:login
}