const express = require('express');
const mysql = require('mysql');

let db = mysql.createPool({host: 'localhost', user: 'root', password: '147258369', database: 'weshare'});

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
