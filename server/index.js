const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const models = require('./models');
const app = express();

app.set('port', (process.env.port || 3003))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 后端api路由
app.use('/api/user', userApi);

app.use(session({
    name: 'identityKey',
    secret: 'mylittlejuhua', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

app.get('/', function (req, res) {
  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    console.log(req.session.isVisit);
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
});

// 监听端口
models.sequelize.sync().then(function(){
	var server = app.listen(app.get('port'),function(){
		console.log('listening on port ' + server.address().port);
	});
});
