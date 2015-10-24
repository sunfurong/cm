var mysqlcon = require('../db/mysqlconnect');


function Cards(card) {
    this.cardnum = card.cardnum;
    this.cusname=card.cusname;
    this.cusphone=card.cusphone;
    this.cusaddress=card.cusaddress;
    this.state=card.state;
}


module.exports = Cards;

//存储活动信息
Cards.prototype.save = function (tablename, callback) {
    //要存入数据库的活动文档
    var cards = {
        cardnum: this.cardnum,
        cusname: this.cusname,
        cusphone: this.cusphone,
        cusaddress: this.cusaddress,
        state:this.state
    }
    //打开数据库
    var sql_string = "insert into " + tablename + "(cardnum,cusname,cusphone,cusaddress,state) value("
        + "'" + cards.cardnum + "','"+ cards.cusname + "','" + cards.cusphone + "','" + cards.cusaddress  + "','" + cards.state+"')";
    console.log(sql_string);
    mysqlcon.handleError();
    mysqlcon.query(sql_string, function (err) {
        if (err) {
            return callback(err,cards);//错误，返回 err 信息
        } else {
            if (cards.length != 0)
                callback(null, cards); //成功！返回查询的用户信息
            else
                callback(null, null);
        }
    });
    mysqlcon.end();
};
//获取某个品牌的所有的任务
Cards.getAll = function (tablename, callback) {
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
