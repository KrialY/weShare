function Shower (obj) {
  this.obj = obj;
}
Shower.prototype = {
  constructor: Shower,
  drag: function () {
    var othis = this;
    othis.obj.onmousedown = function (ev) {
      ev = ev || window.event;
      var disX = ev.clientX - othis.obj.offsetLeft;
      var disY = ev.clientY - othis.obj.offsetTop;
      var preX = ev.clientX;
      var preY = ev.clientY;
      document.onmousemove = function (ev) {
        ev = ev || window.event;

        othis.speedX = ev.clientX - preX;
        othis.speedY = ev.clientY - preY;
        othis.obj.style.left = ev.clientX - disX + 'px';
        othis.obj.style.top = ev.clientY - disY + 'px';
        preX = ev.clientX;
        preY = ev.clientY;
      };
      document.onmouseup = function (ev) {
        ev = ev || window.event;
        var L = ev.clientX - disX;
        var T = ev.clientY - disY;
        if (L <= 0) {
          L = 0;
        }
        if (L >= document.documentElement.clientWidth - othis.obj.offsetWidth) {
          L = document.documentElement.clientWidth - othis.obj.offsetWidth;
        }
        if (T <= 0) {
          T = 0;
        }
        if (T >= document.documentElement.clientHeight - othis.obj.offsetHeight) {
          T = document.documentElement.clientHeight - othis.obj.offsetHeight;
        }
        othis.obj.style.left = L + 'px';
        othis.obj.style.top = T + 'px';
        othis.startMove();
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };
  },
  toPeace: function (obj) {
    obj.style.transform = 'scale(1.35) rotateZ(0deg)';
  },
  toRandom: function (obj) {
    var num = parseInt(Math.random() * 2);

    if (num === 0) {
      obj.style.transform = 'scale(1) rotateZ(30deg)';
    } else {
      obj.style.transform = 'scale(1) rotateZ(-30deg)';
    }
  },
  mouseover: function () {
    var othis = this;

    this.obj.onmouseover = function () {
      othis.obj.style.zIndex = '1000';
      othis.toPeace(this);
    };
  },
  mouseout: function () {
    var othis = this;
    this.obj.onmouseout = function () {
      othis.toRandom(this);
      othis.obj.style.zIndex = 'auto';
    };
  },
  hover: function () {
    this.mouseover();
    this.mouseout();
  },
  css: function (obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj)[attr];
    }
  },
  startMove: function () {
    var othis = this;
    if (othis.obj.timer) return;
    var iSpeedX = this.speedX;
    var iSpeedY = this.speedY;
    if (isNaN(iSpeedX) || isNaN(iSpeedY)) return;
    othis.obj.timer = setInterval(function () {
      changeXY();
      function changeXY () {
        iSpeedX *= 0.95;
        iSpeedY *= 0.95;
        var T1 = parseInt(othis.css(othis.obj, 'left')) + iSpeedX;

        if (T1 <= 0) {
          T1 = 0;
          iSpeedX *= -0.75;
          iSpeedY *= 0.75;
        } else if (T1 >= document.documentElement.clientWidth - othis.obj.offsetWidth) {
          T1 = document.documentElement.clientWidth - othis.obj.offsetWidth;
          iSpeedX *= -0.75;
          iSpeedY *= 0.75;
        }
        othis.obj.style.left = T1 + 'px';
        if (Math.abs(iSpeedX) <= 1) {
          iSpeedX = 0;
        }

        var T = parseInt(othis.css(othis.obj, 'top')) + iSpeedY;
        if (T <= 0) {
          T = 0;
          iSpeedY *= -0.75;
          iSpeedX *= 0.75;
        }
        if (T >= document.documentElement.clientHeight - othis.obj.offsetHeight) {
          T = document.documentElement.clientHeight - othis.obj.offsetHeight;
          iSpeedY *= -0.75;
          iSpeedX *= 0.75;
        }
        othis.obj.style['top'] = T + 'px';
        if (Math.abs(iSpeedY) <= 1) {
          iSpeedY = 0;
        }
        if (Math.abs(iSpeedX) <= 1 && Math.abs(iSpeedY) <= 1) {
          othis.speedX = 0;
          othis.speedY = 0;
          clearInterval(othis.obj.timer);
          othis.obj.timer = null;
        }
      }
    }, 30);
  },
  moveRandom: function () {
    var othis = this;
    var maxX = document.documentElement.clientWidth - 150;
    var maxY = document.documentElement.clientHeight - 150;
    var randomX = parseInt(Math.random() * maxX);
    var randomY = parseInt(30 + Math.random() * maxY);

    this.obj.style.transition = '1.5s';
    this.obj.style.left = randomX + 'px';
    this.obj.style.top = randomY + 'px';

    setTimeout(function () {
      othis.obj.style.transition = 'transform 1s';
    }, 1560);
  }
};
export default Shower;
