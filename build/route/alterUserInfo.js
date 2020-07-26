const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let act = req.body.act;
    let user_id = parseInt(req.session['user_id']);
    if(act == 'avatar'){
      let ext = '.jpg';
      let oldPath = req.files[0].path;
      let newPath = oldPath + ext;
      let newName = req.files[0].filename + ext;
      let deletImgPath = '';

      db.query(`SELECT avatar FROM user_tab WHERE id=${user_id}`, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          deletImgPath = 'static/upload/' + data[0].avatar;
          fs.unlink(deletImgPath, function () {
            console.log('删除成功');
          });
        }
      });

      fs.rename(oldPath,newPath,(err) => {
        if(err){
          console.error(err);
          res.status(500).send('server error').end();
        }else{
          db.query(`UPDATE user_tab SET avatar='${newName}' WHERE id='${user_id}'`, (err,data) => {
            if (err) {
              console.error(err);
              res.status(500).send('database error').end();
            }else{
              res.send({"status":"0","info":"上传成功","avatar":newName}).end();
            }
          });
        }
      });
    }else if (act == 'username') {
      let username = req.body.username;
      db.query(`UPDATE user_tab SET username='${username}' WHERE id='${user_id}'`, (err,data) => {
        if (err) {
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          res.send({"status":"0","info":"修改成功"}).end();
        }
      });
    } else if (act == 'email') {
      let username = req.body.email;
      db.query(`UPDATE user_tab SET email='${username}' WHERE id='${user_id}'`, (err,data) => {
        if (err) {
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          res.send({"status":"0","info":"修改成功"}).end();
        }
      });
    }

  });
  return router;
}
