var mysqlcon = require('../db/mysqlconnect');
function Activity(activity) {
    this.name = activity.name;
    this.director = activity.director;
    this.address = activity.address;
    this.start_time  = activity.start_time;
    this.end_time = activity.end_time;
    this.remark = activity.remark;
    this.title=activity.title;
    this.tel=activity.tel;
    this.manage_name=activity.manage_name;
    this.manage_pawd=activity.manage_pawd;
    this.show = activity.show;
};

module.exports = Activity;

//存储活动信息
Activity.prototype.save = function(callback) {
    //要存入数据库的活动文档
    var activity = {
        name :this.name,
        director:this.director,
        address:this.address,
        start_time:this.start_time,
        end_time:this.end_time,
        remark:this.remark,
        title:this.title,
        tel:this.tel,
        manage_name:this.manage_name,
        manage_pawd:this.manage_pawd,
        show:this.show,
    }
    //打开数据库
    var sql_string="insert into cm_activity(name,director,address,start_time,end_time,remark,activity_title,tel,manage_name,manage_pawd,manage_show) value("
        +"'"+activity.name+"','"+activity.director+"','"+activity.address+"','"+activity.start_time+"','"+activity.end_time+"','"+activity.remark+"','"+
        activity.title+"','"+activity.tel+"','"+activity.manage_name+"','"+activity.manage_pawd+"','"+activity.show+"')";
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string,function (err,activity){
        if (err) {
            return callback(err);//错误，返回 err 信息
        }else{
            if(activity.length!=0)
                callback(null, activity); //成功！返回查询的用户信息
            else
                callback(null,null);
        }
    });
    mysqlcon.end();
};

//读取某个活动信息
Activity.get = function(name, callback) {
    //打开数据库
    var sql_string="select * from cm_activity where name ='"+name+"'";
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string,function(err, rows){
        if (err) {
            return callback(err);//错误，返回 err 信息
        }else{
            if(rows.length!=0)
                callback(null, rows[0]); //成功！返回查询的用户信息
            else
                callback(null,null);

        }
    });
    mysqlcon.end();
};

Activity.getAll=function(callback){
    var sql_string="select * from cm_activity";
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string,function(err, rows){
        if (err) {
            return callback(err);//错误，返回 err 信息
        }else{
            if(rows.length!=0)
                callback(null, rows); //成功！返回查询的用户信息
            else
                callback(null,null);

        }
    });
    mysqlcon.end();
};
Activity.createGoodsTable=function(name,callback){
    var sql_string="CREATE TABLE "+name+"("+
    "id INT(11),"+
     "name VARCHAR(255),"+
        "ssmname VARCHAR(255),"+
        "ssmphone BIGINT(20),"+
        "ssmpassword VARCHAR(255),"+
        "goodsaddress VARCHAR(255),"+
        "bsmname VARCHAR(255),"+
        "bsmpassword VARCHAR(255),"+
        "bsmphone BIGINT(20),"+
        "tasknum BIGINT(20)"+
    ");"
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string,function(err, rows){
        if (err) {
            return callback(err);//错误，返回 err 信息
        }else{
            if(rows.length!=0)
                callback(null, rows); //成功！返回查询的用户信息
            else
                callback(null,null);

        }
    });
}
