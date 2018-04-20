const express = require('express');
const mysql = require('mysql');

let db = mysql.createPool({host: 'localhost', user: 'root', password: '147258369', database: 'weshare'});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let type = req.body.type;
    db.query(`SELECT * FROM imgs_tab WHERE TYPEID=${type}`,(err,data) => {
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        if (data.length === 0) {
          res.send(data).end();
          return;
        }
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          db.query(`SELECT username,avatar FROM user_tab WHERE ID=${item.UPLOADID}`, (err, onedata) => {
            if (err) {
              console.error(err);
              res.status(500).send('database error').end();
            } else {
              item['username'] = onedata[0].username;
              item['avatar'] = onedata[0].avatar;
              if (i === data.length - 1) {
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
