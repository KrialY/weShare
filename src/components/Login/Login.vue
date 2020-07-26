<template>
  <div class="login" ref="loginWrapper">
    <div class="box" ref="box">
      <h1>WeShare</h1>
      <h2>生活热爱分享-Thousands Find</h2>
      <p>
        <a href="javascript:void(0);"  :class="{active:login}" @click="login=true">登录</a>
        <a href="javascript:void(0);" :class="{active:register}" @click="login=false">注册</a>
      </p>
      <div class="loginWrapper" v-show="login" @keyup.enter="lo_submit">
        <input type="text" placeholder="用户名" class="txt" v-model="lo.username">
        <input type="password" placeholder="密码" class="txt" v-model="lo.password">
        <input type="button" value="提交" class="submit" @click="lo_submit">
      </div>
      <div class="registerWrapper" v-show="register" @keyup.enter="re_submit">
        <input type="text" placeholder="邮箱" class="txt" v-model="re.email">
        <input type="text" placeholder="新用户名" class="txt" v-model="re.username">
        <input type="password" placeholder="密码" class="txt" v-model="re.password">
        <input type="password" placeholder="重复密码" class="txt" ref="rePwd">
        <input type="button" value="提交" class="submit" @click="re_submit">
      </div>
    </div>
    <div id="particles-js"></div>
  </div>
</template>

<script type="text/ecmascript-6">
/* global particlesJS:true */
import {mapActions} from 'vuex';
import utils from './../../common/js/util';

export default {
  name: 'Login',
  data () {
    return {
      login: true,
      re: {
        act: 'register',
        email: '',
        username: '',
        password: ''
      },
      lo: {
        act: 'login',
        username: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions([
      'freshUserid'
    ]),
    init () {
      this.attrInit();
      this.particlesInit();
    },
    attrInit () {
      utils.screenHeight(this.$refs.loginWrapper);
      let obox = this.$refs.box;
      var w = document.documentElement.clientWidth || document.body.clientWidth;
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      obox.style.left = (w - obox.offsetWidth) / 2 + 'px';
      obox.style.top = (h - obox.offsetHeight) / 2 - 80 + 'px';
    },
    lo_submit () {
      for (let attr in this.lo) {
        if (this.lo[attr] === '') {
          this.$message({
            message: '请输入完整的登录信息',
            type: 'warning'
          });
          return;
        }
      }
      this.$http.post('/api/login', this.lo).then((res) => {
        let data = res.data;
        let status = data.status;
        let userId = data.user_id;
        if (parseInt(status) === 0) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.freshUserid(userId);
          this.$emit('tologin', 'true');
          this.$router.push({path: '/introduce'});
        } else if (parseInt(status) === 6) {
          this.$message({
            message: '该用户已被封禁！详情请与管理员联系',
            type: 'warning'
          });
        } else {
          this.$message.error('账号或密码错误');
        }
      });
    },
    re_submit () {
      let emailRe = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      let usernameRe = /\w{2,18}/;
      let passwordRe = /\d{6,16}/;
      for (let attr in this.re) {
        if (this.re[attr] === '') {
          this.$message({
            message: '请将信息输入完整！',
            type: 'warning'
          });
          return;
        }
      }
      if (!usernameRe.test(this.re['username'])) {
        this.$message({
          message: '用户名必须是2-18位的字母或者数字！',
          type: 'warning'
        });
        return;
      } else if (!passwordRe.test(this.re['password'])) {
        this.$message({
          message: '密码必须是6-16位的字母或者数字！',
          type: 'warning'
        });
        return;
      } else if (!emailRe.test(this.re['email'])) {
        this.$message({
          message: '请输入有效的邮箱',
          type: 'warning'
        });
        return;
      }
      if (this.re['password'] !== this.$refs.rePwd.value) {
        this.$message({
          message: '两次输入的密码不一致',
          type: 'warning'
        });
        return;
      }
      this.$http.post('/api/login', this.re).then((res) => {
        let data = res.data;
        let status = data.status;

        if (parseInt(status) === 0) {
          let userId = data.user_id;
          this.freshUserid(userId);
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$emit('tologin', 'true');
          this.$router.push({path: '/introduce'});
        } else if (parseInt(status) === 1) {
          this.$message({
            message: '用户名已存在',
            type: 'warning'
          });
        } else if (parseInt(status) === 2) {
          this.$message({
            message: '邮箱已经被注册',
            type: 'warning'
          });
        } else {
          this.$message.error('注册失败');
        }
      });
    },
    particlesInit () {
      particlesJS('particles-js', {
        'particles': {
          'number': {
            'value': 380,
            'density': {
              'enable': true,
              'value_area': 800
            }
          },
          'color': {
            'value': '#999'
          },
          'shape': {
            'type': 'circle',
            'stroke': {
              'width': 0,
              'color': '#000000'
            },
            'polygon': {
              'nb_sides': 5
            },
            'image': {
              'src': 'img/github.svg',
              'width': 100,
              'height': 100
            }
          },
          'opacity': {
            'value': 0.5,
            'random': false,
            'anim': {
              'enable': false,
              'speed': 1,
              'opacity_min': 0.1,
              'sync': false
            }
          },
          'size': {
            'value': 2,
            'random': true,
            'anim': {
              'enable': false,
              'speed': 40,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable': true,
            'distance': 100,
            'color': '#999',
            'opacity': 0.6,
            'width': 1
          },
          'move': {
            'enable': true,
            'speed': 3,
            'direction': 'none',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'bounce': false,
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'interactivity': {
          'detect_on': 'canvas',
          'events': {
            'onhover': {
              'enable': true,
              'mode': 'grab'
            },
            'onclick': {
              'enable': true,
              'mode': 'push'
            },
            'resize': true
          },
          'modes': {
            'grab': {
              'distance': 140,
              'line_linked': {
                'opacity': 1
              }
            },
            'bubble': {
              'distance': 400,
              'size': 40,
              'duration': 2,
              'opacity': 8,
              'speed': 3
            },
            'repulse': {
              'distance': 200,
              'duration': 0.4
            },
            'push': {
              'particles_nb': 4
            },
            'remove': {
              'particles_nb': 2
            }
          }
        },
        'retina_detect': true
      });
    }
  },
  computed: {
    register () {
      return !this.login;
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login
    width 100%
    height 100%
    background #F7FAFC
    overflow: hidden
    canvas
      display block
      vertical-align bottom
      #particles-js
        position absolute
        width 100%
        height 100%
        background #EDF4FA repeat left
        background-position 50% 50%
    .box
      width 225px
      position absolute
      left 0
      top 0
      z-index 10
      a
        text-decoration none
        color rgba(0,0,0,0.7)
        &.active
          color rgba(15,136,235,0.7)
      .txt
        box-sizing border-box
        width 230px
        border 1px solid #999
        padding 8px
        border-radius 3px
        margin-top 10px
      h1
        padding 0
        margin 0
        font-size 55px
        color rgba(15,136,235,0.7)
        font-weight normal
        margin-bottom 20px
      h2
        padding 0
        margin 0
        font-size 16px
        color rgba(0,0,0,0.7)
        font-weight normal
        margin-bottom 20px
        text-align center
      p
        width 220px
        padding 0
        margin 0
        text-align center
        text-indent 10px
        font-size 20px
        margin-bottom 10px
        color #000
    .submit
      box-sizing border-box
      background rgba(0,0,0,0)
      padding 10px
      width 230px
      border-radius 3px
      margin-top 10px
      color #000
      border 1px solid #000
      cursor pointer
      transition 0.5s
      &:hover
        background #000
        color #fff
</style>
