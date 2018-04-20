const express = require('express');
const mysql = require('mysql');
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');


let db = mysql.createPool({host: 'localhost', user: 'root', password: '147258369', database: 'weshare'});

module.exports = function () {
  let router = express.Router();

  router.post('/', (req, res) => {
    let ext = path.parse(req.files[0].originalname).ext;
    let oldPath = req.files[0].path;
    let newPath = oldPath + ext;
    let newName = req.files[0].filename + ext;
    let user_id = parseInt(req.session['user_id']);
    let TYPEID = req.body['imgType'];

    fs.rename(oldPath,newPath,(err) => {
      if(err){
        console.error(err);
        res.status(500).send('server error').end();
      }else{
        let des = sizeOf(`./static/upload/${newName}`);
        db.query(`INSERT INTO imgs_tab (UPLOADID,TYPEID,src,width,height) VALUE('${user_id}','${TYPEID}','${newName}','${des.width}','${des.height}')`);
        res.send({"status":"0","info":"上传成功"}).end();
      }
    });
  });
  return router;
}
