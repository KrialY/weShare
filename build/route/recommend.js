const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');


let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    db.query(`SELECT * FROM imgs_tab WHERE status=0 ORDER BY rand() LIMIT 10`,(err,data) => {
      if (err) {
        console.error(err);
        res.status(500).send('database error').end();
      } else {
        if (data.length === 0) {
          res.send(data).end();
          return;
        }
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          db.query(`SELECT username,avatar FROM user_tab WHERE ID=${item.UPLOADID}`,(err,userdata) => {
            if (err) {
              console.error(err);
              res.status(500).send('database error').end();
            } else {
              item['username'] = userdata[0].username;
              item['avatar'] = userdata[0].avatar;
              if (i >= data.length - 1) {
                console.log(data[0]);
                res.send(data).end();
              }
            }
          });
        }
      }
    });
  });
  return router;
}
