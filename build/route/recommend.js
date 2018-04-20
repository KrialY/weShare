const express = require('express');
const mysql = require('mysql');


let db = mysql.createPool({host: 'localhost', user: 'root', password: '147258369', database: 'weshare'});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    db.query(`SELECT * FROM imgs_tab ORDER BY rand() LIMIT 10`,(err,data) => {
      if (err) {
        console.error(err);
        res.status(500).send('database error').end();
      } else {
        for (let i = 0; i < data.length; i++) {
          db.query(`SELECT username,avatar FROM user_tab WHERE ID=${data[i].UPLOADID}`,(err,userdata) => {
            if (err) {
              console.error(err);
              res.status(500).send('database error').end();
            } else {
              for(let attr in userdata[0]){
                data[i][attr] = userdata[0][attr];
              }
              if (i === data.length - 1){
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
