//专门为处理话题数据库的模型文件
const connection = require('../tools/db_config');

//查询topic表中的数据
exports.findAllTopics = (callback) => {
	     const sqlstr = 'SELECT *FROM `topics` ORDER BY `id` DESC';
	  connection.query(sqlstr,(err, results) => {
	  	if(err) {
	  		return callback(err);
	  	}
	  	callback(null,results)
	  })
}

//根据id来查询数据库中的数据
exports.findTopicById = (id, callback) => {
	const sqlstr = 'SELECT * FROM `topics` WHERE `id` = ?';
	connection.query(sqlstr,id, (err,results) => {
		if (err) {
			return callback(err);
		}
		callback(null,results);
	})
}


//向topic中添加新数据
exports.insertTopic = (body, callback) => {
	      const sqlstr = 'INSERT INTO `topics` SET ?';
	    connection.query(sqlstr,body,(err,results) => {
	    	if(err) {
	    		return callback(err);
	    	}
	    	callback(null,results);
	    })
}

//根据id删除
exports.deleteTopic = (id, callback) => {
	  const sqlstr = 'DELETE FROM `topics` WHERE `id`=?';
	  connection.query(sqlstr,id,(err,results)=> {
	  	if(err) {
	  		return callback(err);
	  	}
	  	callback(null,results);
	  })
}

//修改数据
exports.updateTopicById = (id, body, callback)=> {
	const sqlstr = 'UPDATE `topics` SET `title`=?,`content`=? WHERE `id`=?';
	connection.query(sqlstr, [
        body.title,
        body.content,
        id
    ], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    })
}

