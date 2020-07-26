<template>
  <div id="app">
    <Nav ref="nav"></Nav>
    <!--<img src="./components/Main/images/bg.jpg" alt="">-->
    <transition name="move" mode="out-in">
      <keep-alive>
        <router-view @tologin="login" v-if="ifload" />
      </keep-alive>
    </transition>
    <transition name="fade">
      <Preloading v-show="!ifload"></Preloading>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex';
import Nav from './components/Nav/Nav.vue';
import Preloading from './components/Preloading/Preloading.vue';

export default {
  name: 'App',
  data () {
    return {
      ifload: false
    };
  },
  components: {
    Nav,
    Preloading
  },
  methods: {
    ...mapActions([
      'freshUserid'
    ]),
    preloading () {
      let _this = this;
      let images = [];

      preload([
        // preload body bg
        'http://qd6i9m6la.bkt.clouddn.com/bg.jpg',
        // preload Introduce
        // 'static/img/bg.jpg',
        'http://qd6i9m6la.bkt.clouddn.com/img1.jpg',
        'http://qd6i9m6la.bkt.clouddn.com/img2.jpg',
        'http://qd6i9m6la.bkt.clouddn.com/img3.jpg',
        'http://qd6i9m6la.bkt.clouddn.com/img4.jpg',
        'http://qd6i9m6la.bkt.clouddn.com/img5.jpg'
        // preload Main
        // './components/Main/images/bg.jpg'
      ]);
      function preload (arrs) {
        // let startTime = new Date().getTime();
        let num = 0;
        for (let i = 0; i < arrs.length; i++) {
          images[i] = new Image();
          images[i].src = arrs[i];

          images[i].onload = function () {
            num++;
            if (num >= arrs.length) {
              _this.ifload = true;
            }
          };
        }
      }
    },
    login () {
      this.$refs.nav.showHead = true;
      this.$refs.nav.checkUser();
      this.$refs.nav.initTips();
    },
    getUserId () {
      this.$http.post('/api/login', {'act': 'getLoginUser'}).then((res) => {
        let data = res.data;
        let userId = parseInt(data.user_id);
        this.freshUserid(userId);
      });
    },
    hackIE () {
      function checkIE () {
        return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
      }
      if (checkIE()) {
        window.addEventListener('hashchange', () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        }, false);
      }
    }
  },
  mounted () {
    this.preloading();
    this.getUserId();
    this.hackIE();
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .move-enter-active
    transform translate3d(0,0,0)
  .move-enter-active,.move-leave-active
    transition: 0.5s
  .move-enter
    transform translate3d(-10rem,0,0)
  .move-leave-active
    transform translate3d(10rem,0,0)
  .fade-enter-active
    opacity 1
  .fade-enter-active,.fade-leave-active
    transition: 1.5s
  .fade-enter,.fade-leave-active
    opacity 0
</style>
