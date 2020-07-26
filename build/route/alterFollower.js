const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let act = req.body.act;
    let userID = req.body.userID;
    let fansID=req.body.fansID;

    if (act === 'delete') {
      db.query(`DELETE FROM fans_tab WHERE userID=${userID} AND fansID=${fansID}`, (err, data) => {
        if (err) {
          res.status(500).send('database error').end();
        } else {
          res.send({'status': '0', 'info': '取消关注成功'}).end();
        }
      });
    } else if (act === 'insert') {
      db.query(`INSERT INTO fans_tab (userID,fansID) VALUE('${userID}','${fansID}')`, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('database error').end();
        } else {
          res.send({'status': '0', 'info': '关注成功'}).end();
        }
      });
    }
  });
  return router;
}
