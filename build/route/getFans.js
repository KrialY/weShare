const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let act = req.body.act;
    let userID=req.body.userID;
    let fansID=req.body.fansID;
    let queryStr='';

    if(typeof (fansID) === 'undefined'){
      if (act == 'user') {
        queryStr = `SELECT * FROM fans_tab WHERE fansID=${userID}`;
      } else if (act == 'fans') {
        queryStr = `SELECT * FROM fans_tab WHERE userID=${userID}`;
      }
    }else{
      queryStr=`SELECT * FROM fans_tab WHERE fansID=${fansID} AND userID=${userID}`;
    }

    db.query(queryStr, (err, data) => {
      if (err) {
        console.err(err);
        res.status(500).send('database error').end();
        return;
      } else {
        if (act == 'user') {
          let finalData = [];

          if (data.length <= 0) {
            res.send(finalData).end();
            return;
          }
          for (let i = 0; i < data.length; i++) {
            db.query(`SELECT * from user_tab WHERE ID=${data[i].userID}`, (err, userdata) => {
              if (err) {
                console.err(err);
                res.status(500).send('database error').end();
                return;
              } else {
                finalData[i]=userdata[0];
                if (i == data.length - 1){
                  res.send(finalData).end();
                  return;
                }
              }
            });
          }
        } else if (act == 'fans') {
          let finalData = [];

          if (data.length <= 0) {
            res.send(finalData).end();
            return;
          }
          for (let i = 0; i < data.length; i++) {
            db.query(`SELECT * from user_tab WHERE ID=${data[i].fansID}`, (err, userdata) => {
              if (err) {
                console.err(err);
                res.status(500).send('database error').end();
                return;
              } else {
                finalData[i]=userdata[0];
                if (i == data.length - 1){
                  res.send(finalData).end();
                  return;
                }
              }
            });
          }
        } else {
          res.send(data).end();
          return;
        }
      }
    });
  });
  return router;
}
