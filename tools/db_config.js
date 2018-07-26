// 配置mysql包
// 处理mysql包
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zlq1234',
    database: 'ithub'
});
// 下面这行代码 在connection.query()时会自动开启连接
// 所以 可以省略不写
// connection.connect();


module.exports = connection;