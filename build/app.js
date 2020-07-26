var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const multerObj = multer({dest: 'static/upload'});

const dbConfig = require('./route/databaseConfig');
const appData = require('data.json');
const typeimgs = appData['typeimgs'];
const recommend = appData['recommend'];

var app = express();
let keys = [];
for (let i = 0; i < 10000; i++) {
  keys.push('signed_'+Math.random());
}
let db = null;
setInterval(() => {
  const fs = require('fs');
  const mysql = require('mysql');
  let deletImgPath = '';
  let deletImgPath2 = '';
  if (db === null) {
    db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});
  }

  db.query(`SELECT src FROM imgs_tab WHERE status=2`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      db.query(`DELETE FROM imgs_tab WHERE status=2`, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          for (let i = 0; i < data.length; i++) {
            deletImgPath = 'static/upload/' + data[i].src;
            deletImgPath2 = 'static/upload/1024-' + data[i].src;
            fs.unlink(deletImgPath, function () {
              console.log('删除成功');
            });
            fs.unlink(deletImgPath2, function () {
              console.log('删除成功');
            });
          }
        }
      });
    }
  });
}, 1000 * 60 * 60 * 24);

app.use(multerObj.any());
app.use(cookieParser());
app.use(cookieSession({
    name: 'user_id',
    keys: keys,
    maxAge: 60 * 60 * 1000
}));
app.use(bodyParser.urlencoded());
app.get('/api/typeimgs',(req,res) => {
res.send(typeimgs[req.query.act]);
});
app.get('/api/recommend',(req,res) => {
res.send(recommend);
});
app.use('/api/getFans',require('./route/getFans')());
app.use('/api/modifyBarrage',require('./route/modifyBarrage')());
app.use('/api/alterFollower',require('./route/alterFollower')());
app.use('/api/getStrangerInfo',require('./route/getStrangerInfo')());
app.use('/api/login',require('./route/login')());
app.use('/api/getUnpassedPic',require('./route/getUpassedPic')());
app.use('/api/alterUserInfo',require('./route/alterUserInfo')());
app.use('/api/imgupload',require('./route/upload')());
app.use('/api/getTypes',require('./route/types')());
app.use('/api/getTypeImgs',require('./route/typeImgs')());
app.use('/api/getRecommend',require('./route/recommend')());
app.use('/api/getLike',require('./route/like')());
app.use('/api/getCollect',require('./route/collect')());
app.use('/api/getUpload',require('./route/myupload')());
app.use('/api/modifyLike',require('./route/modifyLike')());
app.use('/api/modifyCollect',require('./route/modifyCollect')());
app.use('/api/download',require('./route/download')());


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // 访问静态资源
app.use(express.static(path.resolve(__dirname, './dist')));
// // 访问单页
// app.get('*', function (req, res) {
// var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
//  res.send(html);
// });
// 监听
app.listen(8081, function () {
  console.log('success listen...8081');
});