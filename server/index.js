const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('port', (process.env.port || 3003))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(app.get('port'), function () {
    console.log('GetData http://localhost:' + app.get('port'))
})
