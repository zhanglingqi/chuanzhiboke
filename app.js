//导包
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');

//引入
const router = require('./router');

//实例化app
const app = express();
//配置express-session包
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//配置包
// 模板引擎
app.engine('html', require('express-art-template'));
// 统一处理静态资源
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//挂载路由  写在绑定端口前面
app.use(router);

//绑定端口
app.listen(12345,() => {
	console.log('run it at 12345')
})

