const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let uploaderId = req.body.uploader;

    db.query(`SELECT username,avatar,email,uStatus FROM user_tab WHERE ID=${uploaderId}`,(err,data) => {
      if (err) {
        console.error(err);
        res.status(500).send('database error').end();
      } else {
        if (data.length <= 0) {
          res.send([{'status': '1', 'info': 'fail'}]).end();
        } else {
          data[0]['status'] = '0';
          data[0]['info'] = 'success';
          data[0]['user_id'] = uploaderId;
          res.send(data[0]).end();
        }
      }
    });
  });
  return router;
}
