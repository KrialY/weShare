const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let userId=req.body.userId;
    if (userId == -1) return;
    db.query(`SELECT * FROM imgs_tab WHERE status=0 AND UPLOADID=${userId}`,(err,data) => {
      if (err) {
        console.err(err);
        res.status(500).send('database error').end();
      } else {
        if (data.length <= 0) {
          res.send(data).end();
          return;
        }
        for(let i=0;i<data.length;i++){
          db.query(`SELECT username,avatar from user_tab WHERE ID=${data[i].UPLOADID}`,(err,userdata) => {
            if (err) {
              console.err(err);
              res.status(500).send('database error').end();
            } else {
              for(let attr in userdata[0]){
                data[i][attr]=userdata[0][attr];
              }
              if (i >= data.length - 1){
                res.send(data).end();
                return;
              }
            }
          });
        }
      }
    });
  });
  return router;
}
