const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = function () {
  let router = express.Router();

  router.get('/', (req, res) => {
    var fileName = req.query.fname;
    //以文件流的形式下载文件
    var filePath = path.join(__dirname, '../../static/upload/' + fileName);
    var stats = fs.statSync(filePath);
    var isFile = stats.isFile();
    if(isFile){
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=' + fileName,
        'Content-Length': stats.size
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.end(404);
    }
  });
  return router;
}
