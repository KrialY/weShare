const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let userId=req.body.userId;
    let finalData = [];
    if( userId === -1) return;

    db.query(`SELECT * FROM like_tab WHERE USERID=${userId}`, (err, data) => {
      if (err) {
        console.err(err);
        res.status(500).send('database error').end();
      } else {

        if(data.length === 0){
          res.send(finalData).end();
          return;
        }
        for (let i = 0; i < data.length; i++) {
          db.query(`SELECT * FROM imgs_tab WHERE ID=${data[i].IMGID}`,(err,imgdata) => {
            if (err) {
              console.err(err);
              res.status(500).send('database error').end();
            } else {
              if(imgdata.length > 0) {
                db.query(`SELECT username,avatar from user_tab WHERE ID=${imgdata[0].UPLOADID}`, (err, userdata) => {
                  if (err) {
                    console.err(err)
                    res.status(500).send('database error').end();
                  } else {
                    for (let attr in userdata[0]){
                      imgdata[0][attr]=userdata[0][attr];
                    }
                    if(parseInt(imgdata[0]['status'])==0){
                      finalData.push(imgdata[0]);
                    }
                    if (i === data.length - 1){
                      res.send(finalData).end();
                      return;
                    }
                  }
                });
              }else if(i === data.length - 1){
                res.send(finalData).end();
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
