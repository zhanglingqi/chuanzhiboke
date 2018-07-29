//话题的控制器 所有话题相关的业务

//导入话题模型
var M_topic = require('../models/m_topic');
// 导入moment包
//const moment = require('moment');
//渲染话题列表页
exports.showIndex = (req,res) => {
	M_topic.findAllTopics((err,results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			});
		}
		res.render('index.html', {
			user:req.session.user,
			topics:results
		});
	});
}
// 渲染发布新话题页面
exports.showCreateTopic = (req, res) => {

    // 渲染发布新话题topic/create.html
    res.render('topic/create.html');
};

//处理发布新话题的请求
exports.handleCreateTopic = (req, res) => {
	
	//获取表单数据
	const body = req.body;
	
	//给设置的表单数据设置一个时间 通过一个小插件来实现
//	 body.createdAt = moment().format();
//	 console.log(body)
	 
	   // 给表单数据设置userId(用来区分该话题是由谁创建的
    body.userId = req.session.user.id;
    
    //让模型操作数据库，向数据库中添加新数据
    M_topic.insertTopic(body,(err,results) => {
    	if (err) {
    		return res.send({
    			code:500,
    			message:err.message
    		});
    	}
	//发送到客户端 200代表跳转到列表页
	res.send({
		code:200,
		message:'你可以跳转到列表页'
	})
    })
}

//渲染详情页
exports.showDetail = (req, res) => {
	//获取请求对象中的动态参数 
	const topicId = req.params.topicId;
	
	//让模型根据id找数据
	M_topic.findTopicById(topicId,(err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			})
		}
		// 在渲染详情页时, 绑定数据results[0]

        res.render('topic/show.html', {
            sessonUserId: req.session.user.id,

            topic: results[0]
        });
	})
}

//处理删除请求
exports.deleteTopic = (req, res) => {
	//获取topicId
	const topicId = req.params.topicId;
	//掉模型去删除数据
	M_topic.deleteTopic(topicId, (err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			})
		}
		
		res.send({
			code:200,
			message:'删除成功'
		})
	})
}

//渲染编辑页面
exports.showEdit = (req, res) => {
	// 1. 获取topicId
    const topicId = req.params.topicId;
    
    //让模板根据id查找数据
    M_topic.findTopicById(topicId,(err, results) => {
    	if (err) {
    		return res.send({
    			code:500,
    			message:err.message
    		})
    	}
    	// 3. 渲染edit.html并且绑定数据
        res.render('topic/edit.html', {
            topic: results[0]
        });
    });
}

//处理编辑表单的请求
exports.handleEdit = (req, res) => {
	// 1. 获取topicId
    const topicId = req.params.topicId;
    
    //接受数据
    const body = req.body;
    
    //让模型去修改
    M_topic.updateTopicById(topicId,body,(err, results) => {
    	if(err) {
    		return res.send({
    			code:500,
    			message:err.message
    		})
    	}
    	//发送响应
    	res.send({
    		code:200,
    		message:'修改成功'
    	})
    })
}
