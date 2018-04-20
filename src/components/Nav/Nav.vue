<template>
  <div class="nav navbar navbar-inverse navbar-fixed-top" :style="`top:${navTop}px`">
    <div class="container">
      <div class="navbar-header">
        <a href="two.html" class="navbar-brand">
          <img src="./title.png" alt="" style="width: 30px;height: 30px;margin-top: -5px;">
        </a>
        <a href="#/main" class="navbar-brand">WeShare</a>
        <button class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li :class="{'active':nowUrl==0}" @click="nowUrl=0"><a href="#/introduce">介绍</a></li>
          <li :class="{'active':nowUrl==1}" @click="nowUrl=1"><a href="#/main">主站</a></li>
          <li :class="{'active':nowUrl==2}" @click="nowUrl=2"><a href="#/sort">分类</a></li>
        </ul>
        <p class="navbar-text pull-right nologin" style="margin-top: 18px;" v-show="userId===-1"><a href="#/login" class="navbar-link">登录 or 注册</a></p>
        <p class="navbar-text pull-right circle_head" v-show="userId!==-1">
          <a href="#/personcenter"></a>
          <a href="javascript:void(0);" @click="logout">退出</a>
          <a href="#/upload">上传</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* global $:true */
import { mapGetters, mapActions } from 'vuex';
import utils from './../../common/js/util';
export default {
  name: 'Nav',
  data () {
    return {
      navTop: 0
    };
  },
  methods: {
    ...mapActions([
      'freshUserid'
    ]),
    auto (flag) {
      let _this = this;
      if (flag) {
        $(window).on('mousewheel DOMMouseScroll', scrollEve);
      } else {
        $(window).off('mousewheel DOMMouseScroll');
      }
      function scrollEve (e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
        if (delta > 0) {
          // 向上滚
          _this.navTop = 0;
        } else if (delta < 0) {
          // 向下滚
          _this.navTop = -50;
        }
      }
    },
    logout () {
      this.$http.post('/api/login', {'act': 'logout'}).then((res) => {
        let data = res.data;
        let status = data.status;
        let info = data.info;
        if (parseInt(status) === 0) {
          alert(info);
          utils.removeCookie('user_login');
          this.freshUserid(-1);
          this.$router.push({path: '/introduce'});
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
    nowUrl: {
      get () {
        switch (this.$route.path) {
          case '/introduce':
            this.auto(false);
            return 0;
          case '/main':
            this.auto(true);
            return 1;
          case '/sort':
            this.auto(true);
            return 2;
          default:
            this.auto(false);
            return -1;
        }
      },
      set () {
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nav
    opacity 0.6
    box-shadow 3px 3px 5px 5px rgba(0,0,0,0.5)
    transition 0.5s
    .circle_head
      width 35px
      height 35px
      margin 7px
      margin-right 100px
      border-radius 50%
      box-sizing border-box
      background #fff url("") no-repeat center
      background-size cover
      cursor pointer
      position relative
      transition 0.5s
      a
        &:nth-of-type(1)
          display block
          width 35px
          height 35px
          position absolute
          left 0
          top 0
        &:nth-of-type(2)
          text-decoration none
          position absolute
          left 100px
          color #fff
          display block
          width 35px
          top 10px
        &:nth-of-type(3)
          display block
          width 35px
          height 35px
          color #fff
          position absolute
          left 50px
          top 10px
</style>
