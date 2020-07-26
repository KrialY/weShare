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
        <p
          class="navbar-text pull-right circle_head" v-show="userId!==-1">
          <transition name="fade">
            <span
              @mouseover="isProfile=true;"
              @mouseout="isProfile=false;"
              v-show="isProfile"
              class="profile">
              <el-badge is-dot class="item" v-if="isNewsLoaded">
                <el-button
                  style="padding:0;"
                  @click="systemTips"
                  type="text">系统消息</el-button>
              </el-badge>
              <el-button
                v-if="!isNewsLoaded"
                style="padding:0;"
                @click="systemTips"
                type="text">系统消息</el-button>
            </span>
          </transition>
          <a href="#/personcenter"
             @mouseover="isProfile=true;"
             @mouseout="isProfile=false;"
             :style="`background-image:url('${PATH}${avatar}');`"></a>
          <el-badge is-dot class="item" v-if="isNewsLoaded"></el-badge>
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

const PATH = '/static/upload/';
export default {
  name: 'Nav',
  data () {
    return {
      navTop: 0,
      avatar: '',
      isProfile: false,
      PATH: PATH,
      isNewsLoaded: false,
      unPassedMsg: '暂无',
      unProcessedMsg: ''
    };
  },
  methods: {
    ...mapActions([
      'freshUserid'
    ]),
    initTips () {
      let othis = this;
      this.$http.post('/api/getUnpassedPic').then((res) => {
        let data = res.data;

        console.log(data);
        if (data.length > 0) {
          let unPassedMsg = '审核不通过的图片：<br>';
          let unProcessedMsg = '还未审核的图片：<br>';
          for (let i = 0; i < data.length; i++) {
            let str = `<a href='${PATH}${data[i].src}' target='_Blank'>图片：${i + 1}</a>&nbsp;&nbsp;`;
            if (parseInt(data[i].status) === 1) {
              unProcessedMsg += str;
            } else if (parseInt(data[i].status) === 2) {
              unPassedMsg += str;
            }
          }
          othis.unPassedMsg = unPassedMsg;
          othis.unProcessedMsg = unProcessedMsg;
          othis.isNewsLoaded = true;
        } else {
          othis.isNewsLoaded = false;
        }
      });
    },
    systemTips () {
      var othis = this;
      this.$notify({
        title: '关于你所上传的图片的审核结果',
        dangerouslyUseHTMLString: true,
        message: `${othis.unProcessedMsg}<br>${othis.unPassedMsg}`,
        duration: 0,
        offset: 50
      });
    },
    checkUser () {
      let othis = this;
      this.$http.post('/api/login', {'act': 'getLoginUser'}).then((res) => {
        let data = res.data;
        let userId = parseInt(data.user_id);

        if (userId !== -1) {
          othis.initTips();
        }
        if (userId === -1) {
          return;
        }
        othis.avatar = data.avatar;
      });
    },
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
      let othis = this;
      this.$http.post('/api/login', {'act': 'logout'}).then((res) => {
        let data = res.data;
        let status = data.status;
        let info = data.info;
        if (parseInt(status) === 0) {
          this.$message(info);
          utils.removeCookie('user_login');
          this.freshUserid(-1);
          othis.isNewsLoaded = false;
          othis.unPassedMsg = '暂无';
          othis.unProcessedMsg = '';
          window.localStorage.setItem('systemTips', '0');
          this.$router.push({path: '/login'});
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
          case '/usercenter':
            this.auto(true);
            return 3;
          case '/personcenter':
            this.auto(true);
            return 4;
          default:
            this.auto(false);
            return -1;
        }
      },
      set () {
      }
    }
  },
  mounted () {
    this.checkUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .fade-enter-active
    opacity 1
    transform translateY(0px)
  .fade-enter-active,.fade-leave-active
    transition: 0.5s
  .fade-enter,.fade-leave-active
    opacity 0
    transform translateY(10px)
  .nav
    box-shadow 3px 3px 5px 5px rgba(0,0,0,0.5)
    transition 0.5s
    .circle_head
      width 35px
      height 35px
      margin 7px
      margin-right 100px
      box-sizing border-box
      background url("") no-repeat center
      cursor pointer
      position relative
      border-radius 50%
      background-color #666
      transition 0.5s
      .item
        margin-top 2px
        margin-left: 25px
      .profile
        display block
        position absolute
        top 45px
        width 260px
        left -110px
        background #fff
        padding 30px 10px
        box-shadow 0 2px 4px rgba(0,0,0,.16)
        cursor auto
        transition .5s
        &:hover + a
          transform translateY(15px) scale(1.8)
      a
        &:nth-of-type(1)
          display block
          width 35px
          height 35px
          position absolute
          left 0
          top 0
          border-radius 50%
          background-size cover
          transition .5s
          &:hover
            transform translateY(15px) scale(1.8)
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
