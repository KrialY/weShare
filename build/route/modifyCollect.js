const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let userId = parseInt(req.body.userId);
    let action = parseInt(req.body.action);
    let imgId = parseInt(req.body.imgId);
    if( userId === -1) {
      res.send({"status":"1","info":"fail"}).end();
      return;
    };
    if (action === 1) {
      db.query(`INSERT INTO collect_tab (USERID,IMGID) VALUE('${userId}','${imgId}')`,(err) => {
        if (err) {
          res.status(500).send('database error').end();
        } else {
          res.send({"status":"0","info":"success"}).end();
        }
      });
    } else if (action === 0) {
      db.query(`DELETE FROM collect_tab WHERE USERID=${userId} AND IMGID=${imgId}`,(err) => {
        if (err) {
          res.status(500).send('database error').end();
        } else {
          res.send({"status":"0","info":"success"}).end();
        }
      });
    }
  });
  return router;
}
