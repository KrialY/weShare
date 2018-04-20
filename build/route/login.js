const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');

let db = mysql.createPool({host: 'localhost', user: 'root', password: '147258369', database: 'weshare'});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let act = req.body.act;
    let username = req.body.username;
    let password = common.md5(req.body.password + common.MD5_SUFFIX);
    let email = req.body.email;
    if (act === 'login') {
      db.query(`SELECT ID,username,password from user_tab`, (err, data) => {
        let ok = true;
        if (err) {
          res.status(500).send('database error').end();
        } else {
          for(let i=0;i<data.length;i++){
            let item = data[i];
            if (item.username === username && item.password === password) {
              req.session['user_id'] = item.ID;
              res.send({'status': '0', 'info': '登录成功' ,"user_id":item.ID}).end();
              ok = false;
              break;
            }
          }
          if(ok){
            res.send({'status': '3', 'info': '账号或者密码错误'}).end();
          }
        }
      });
    } else if (act === 'register') {
      db.query(`SELECT username,email from user_tab`, (err, data) => {
        let ok = true;
        if (err) {
          res.status(500).send('database error').end();
        } else {
          for(let i=0;i<data.length;i++){
            let item = data[i];
            if (item.username === username) {
              res.send({'status': '1', 'info': '用户名已存在'}).end();
              ok = false;
              break;
            } else if (item.email === email) {
              res.send({'status': '2', 'info': '邮箱已被注册'}).end();
              ok = false;
              break;
            }
          }
          if (ok) {
            db.query(`INSERT INTO user_tab (username,password,email) VALUE('${username}','${password}','${email}')`, (err) => {
              if (err) {
                console.error(err);
                res.status(500).send('database error').end();
              } else {
                db.query(`SELECT max(id) from user_tab`,(err,resData) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send('database error').end();
                  } else {
                    req.session['user_id'] = resData[0]['max(id)'];
                    res.send({'status': '0', 'info': '注册成功'}).end();
                  }
                });
              }
            });
          }
        }
      });
    }else if(act === 'logout'){
      delete req.session['user_id'];
      res.send({"status":"0","info":"退出成功"}).end();
    }else if(act === 'getLoginUser'){
      let userId = req.session['user_id'];
      if(!userId) {
        res.send({"status":"0","user_id":"-1"}).end();
        return;
      };
      db.query(`SELECT username,avatar,email FROM user_tab WHERE ID=${userId}`,(err,data) => {
        if (err) {
          console.error(err);
          res.status(500).send('database error').end();
        } else {
          data[0]['status'] = '0';
          data[0]['info'] = 'success';
          data[0]['user_id'] = userId;
          res.send(data[0]).end();
        }
      });
    }
  });
  return router;
}
