var User = require('../models/user/user');
var crypto = require('crypto');

function reg(req,res){
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];

    if (password_re != password) {
        req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');

    var newUser = new User({
        name: name,
        password: password,
        activename: req.body.activename
    });

    User.get(newUser.name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在!');
            return res.redirect('/reg');
        }

        newUser.save(function (err, user) {

            if (err) {
                console.log(err);
                req.flash('error', err);
                return res.redirect('/reg');
            }
            console.log(user.username);
            req.session.user = user;
            req.flash('success', '注册成功!');
            res.redirect('/');
        });
    });
}

module.exports={
    reg:reg
}