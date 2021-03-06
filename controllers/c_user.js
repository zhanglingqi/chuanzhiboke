//专门实现用户相关功能的控制器

//导入m_user.js模型
const M_user = require('../models/m_user');

//渲染登录页 render 自动会识别views文件夹
exports.showSignin = (req, res) => {
	res.render('signin.html');
};

//处理表单
exports.handleSignin = (req, res) => {
	// 获取表单数据
	const body = req.body;

	//验证表单数据  让模型去查看邮箱 并且把数据库操作的结果返回
	M_user.checkEmail(body.email, (err, result) => {
		if(err) {
			return res.send({
				code: 500,
				message: err.message
			});
		}
		//查询没结果 说明邮箱不存在
		if(!result[0]) {
			return res.send({
				code: 1,
				message: '邮箱不存在'
			})
		}

		//邮箱存在 验证密码存在吗
		if(result[0].password !== body.password) {
			return res.send({
				code: 2,
				message: '密码不正确'
			})
		}

		//都正确  把对象存储起来 
		req.session.user = result[0];

		//发送到客户端
		res.send({
			code: 200,
			message: '可以登录 跳转到话题列'
		})
	})
}

//处理用户退出请求
exports.handleSignout = (req, res) => {
	//用delete方法  将session，user移除
	delete req.session.user;

	//跳转到登录页
	res.redirect('/signin');
}

//渲染登录页面
exports.showSignup = (req, res) => {
	res.render('signup.html')
}

//处理表单数据 
exports.handleSignup = (req, res) => {
	//获取表单数据
	const body = req.body;
	//让模型去操作数据库
	//先验证邮箱
	M_user.checkEmail(body.email, (err, results) => {
		if(err) {
			return res.send({
				code: 500,
				message: err.message
			})
		}
		if(results[0]) {
			return res.send({
				code: 1,
				message: '邮箱已存在'
			})
		}

		//验证昵称
		M_user.checkNickname(body.nickname, (err, results) => {
			if(err) {
				return res.send({
					code: 500,
					message: err.message
				})
			}
			if(results[0]) {
				return res.send({
					code: 2,
					message: '昵称已存在'
				})
			}

			//添加用户信息
			M_user.insertUser(body, (err, results) => {
				if(err) {
					return send({
						code: 500,
						message: err.message
					})
					
				}
				res.send({
						code: 200,
						message: '注册成功。跳转到登录页'
					})
			})

		})

	})

}