var mysqlcon = require('../db/mysqlconnect');


function Goods(goods) {
    this.name = goods.name;
    this.ssmname = goods.ssmname;
    this.ssmpassword = goods.ssmpassword;
    this.ssmphone = goods.ssmphone;
    this.goodsaddress = goods.goodsaddress;
    this.bsmname = goods.bsmname;
    this.bsmpassword = goods.bsmpassword;
    this.bsmphone = goods.bsmphone;
    this.tasknum = goods.tasknum;
}


module.exports = Goods;

//存储活动信息
Goods.prototype.save = function (tablename, callback) {
    //要存入数据库的活动文档
    var goods = {
        name: this.name,
        ssmname: this.ssmname,
        ssmpassword: this.ssmpassword,
        ssmphone: this.ssmphone,
        goodsaddress: this.goodsaddress,
        bsmname: this.bsmname,
        bsmpassword: this.bsmpassword,
        bsmphone: this.bsmphone,
        tasknum: this.tasknum,
    }

    //打开数据库
    var sql_string = "insert into " + tablename + "(name,ssmname,ssmpassword,ssmphone,goodsaddress,bsmname,bsmpassword,bsmphone,tasknum) value("
        + "'" + goods.name + "','" + goods.ssmname + "','" + goods.ssmpassword + "','" + goods.ssmphone + "','" + goods.goodsaddress + "','" + goods.bsmname + "','" +
        goods.bsmpassword + "','" + goods.bsmphone + "','" + goods.tasknum + "')";
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string, function (err) {
        if (err) {
            return callback(err,goods);//错误，返回 err 信息
        } else {
            if (goods.length != 0)
                callback(null, goods); //成功！返回查询的用户信息
            else
                callback(null, null);
        }
    });
    mysqlcon.end();
};

//读取某个活动信息
Goods.get = function (tablename, name, callback) {
    //打开数据库
    var sql_string = "select * from " + tablename + " where name ='" + name + "'";
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string, function (err, rows) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        } else {
            if (rows.length != 0)
                callback(null, rows[0]); //成功！返回查询的用户信息
            else
                callback(null, null);

        }
    });
    mysqlcon.end();
};

Goods.getAll = function (tablename, callback) {
    var sql_string = "select * from " + tablename;
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string, function (err, rows) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        } else {
            if (rows.length != 0)
                callback(null, rows); //成功！返回查询的用户信息
            else
                callback(null, null);

        }
    });
    mysqlcon.end();
};
Goods.createGoodTaskTable=function(name,callback){
    var sql_string="CREATE TABLE "+name+"("+
        "id INT(11) primary key auto_increment,"+
        "cardnum VARCHAR(255),"+
        "cusname VARCHAR(255),"+
        "cusphone BIGINT(20),"+
        "cusaddress VARCHAR(255),"+
        "state INT(2)"+
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
