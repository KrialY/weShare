export default {
  screenHeight (objs) {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    if (!objs.length) {
      objs.style.height = h + 'px';
      return h;
    }
    for (let i = 0; i < objs.length; i++) {
      objs[i].style.height = h + 'px';
    }
    return h;
  },
  getMinHeight (arr) {
    let minH = arr[0];
    let index = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < minH) {
        index = i;
        minH = arr[i];
      }
    }
    return index;
  },
  getTop (obj) {
    var iTop = 0;
    while (obj) {
      iTop += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return iTop;
  },
  getCookie (cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    console.log(document.cookie);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  },
  setCookie (cname, cvalue, exMinues) {
    var d = new Date();
    d.setTime(d.getTime() + (exMinues * 60 * 1000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + ';path=/; ' + expires;
  },
  removeCookie (name) {
    this.setCookie(name, '', -1);
  }
};
