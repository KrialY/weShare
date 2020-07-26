const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    db.query(`SELECT * FROM type_tab`,(err,data) => {
      if(err){
        console.err(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data).end();
      }
    });
  });
  return router;
}
