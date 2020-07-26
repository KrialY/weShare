const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let act = req.body.act;
    let userID = parseInt(req.session['user_id']);
    let imgID = req.body.imgID;
    if (act === 'insert') {
      let content = req.body.content;
      db.query(`INSERT INTO barrage_tab (userID,imgID,content) VALUE('${userID}','${imgID}','${content}')`, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('database error').end();
        } else {
          res.send({'status': '0', 'info': '插入成功'}).end();
        }
      });
    } else if (act === 'delete') {
      let ID = req.body.ID;
      db.query(`DELETE FROM barrage_tab WHERE ID=${ID}`, (err, data) => {
        if (err) {
          res.status(500).send('database error').end();
        } else {
          res.send({'status': '0', 'info': '删除成功'}).end();
        }
      });
    }else if (act === 'getBarrage') {
      db.query(`SELECT * FROM barrage_tab WHERE imgID=${imgID} ORDER BY rand() LIMIT 100`, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('database error').end();
        } else {
          res.send(data).end();
        }
      })
    }
  });
  return router;
}
