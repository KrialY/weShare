const express = require('express');
const mysql = require('mysql');

let db = mysql.createPool({host: 'localhost', user: 'root', password: '147258369', database: 'weshare'});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let userId=req.body.userId;
    if( userId === -1) return;
    db.query(`SELECT * FROM collect_tab WHERE USERID=${userId}`,(err,data) => {
      if (err) {
        console.err(err);
        res.status(500).send('database error').end();
      } else {
        let finalData = [];
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
              db.query(`SELECT username,avatar from user_tab WHERE ID=${imgdata[0].UPLOADID}`,(err,userdata) => {
                if (err) {
                  console.err(err)
                  res.status(500).send('database error').end();
                } else {
                  for(let attr in userdata[0]){
                    imgdata[0][attr]=userdata[0][attr];
                  }
                  finalData.push(imgdata[0]);
                  if (i === data.length - 1){
                    res.send(finalData).end();
                    return;
                  }
                }
              });
            }
          });
        }
      }
    });
  });
  return router;
}
