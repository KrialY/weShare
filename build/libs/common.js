const cryto = require('crypto');

module.exports = {
  MD5_SUFFIX:'f.dgfdg44))365g浮cxv点数s(f4d.15f*23%%<;l,.;fsd34ew~sdf第三方',
  md5 (str) {
    let obj = cryto.createHash('md5');
    obj.update(str);
    let finstr = obj.digest('hex');
    return finstr;
  }
}
