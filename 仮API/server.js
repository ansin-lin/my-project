const express = require('express');
const cors = require('cors');
const dayjs = require("dayjs");
const fs = require('fs');  // 用于读取文件
const path = require('path');  // 用于处理文件路径
const app = express();
const port = 3000;

// 使用 CORS 中间件
app.use(cors());
app.use(express.json());

// API 路由：获取所有用户
app.post('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');  // 指定 JSON 文件路径
  
  // 使用 fs 模块读取文件
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Failed to read data file' });
      return;
    }
    
    let resData = JSON.parse(data)
            .filter(item => {
              console.log(item.userName,req.body.name)
              return (req.body.name === "" || item.first_name.includes(req.body.name) ||item.last_name.includes(req.body.name)) &&
                  (req.body.mail === "" || item.user_mail.includes(req.body.mail)) &&
                  (req.body.tel === "" || item.user_tel.includes(req.body.tel));
            }).map(item => {
              item.create_time = dayjs(item.create_time).format("YYYY-MM-DD HH:mm:ss");
              item.update_time = dayjs(item.update_time).format("YYYY-MM-DD HH:mm:ss");
              return item;
            })
            ;
    // 返回读取到的 JSON 数据
    res.json(resData);  // 解析并返回 JSON 格式的数据
  });
});
app.get('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json'); // 指定 JSON 文件路径

  // 读取文件
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Failed to read data file' });
      return;
    }

    let resData = JSON.parse(data)

    // 返回 JSON 数据
    res.json(resData);
  });
});
// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});