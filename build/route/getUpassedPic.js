const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig');

let db = mysql.createPool({host: dbConfig.host, user: dbConfig.user, password: dbConfig.password, database: dbConfig.database});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let user_id = parseInt(req.session['user_id']);

    db.query(`SELECT * FROM imgs_tab WHERE UPLOADID=${user_id} and status!=0`,(err,data) => {
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
          res.send(data).end();
      }
    });
  });
  return router;
}
