// 模型: 专门处理c_user.js中的数据的模型

// 导入数据库配置的模块
const connection = require('../tools/db_config');

function checkEmail(email, callback) {
    const sqlstr = 'SELECT *FROM `users` WHERE `email`=?';
    connection.query(sqlstr, email, (err, result) => {
        if (err) {
            return callback(err);
        }
        // null的目的是 让c_user.js中的callback()调用对应上实参
        callback(null, result);
    });
}
// 我们发现:
// 要在c_user.js控制器中使用checkEmail里面数据库查询的结果
// 要在c_user.js控制器中使用checkEmail里面异步操作的结果
// 要在checkEmail外部使用checkEmail里面异步操作的结果
// 在函数外部使用函数内部中异步操作的结果
// 只能使用回调函数去实现
// 在异步操作中 把结果传递给callback


exports.checkEmail = checkEmail;