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
        '/static/img/bodybg.png',
        // preload Introduce
        './components/Introduce/images/bg.jpg',
        '/static/img/PhotoCard/1/game (4).jpg',
        '/static/img/PhotoCard/1/game (5).jpg',
        '/static/img/PhotoCard/1/game (6).jpg',
        '/static/img/PhotoCard/1/game (16).jpg',
        '/static/img/PhotoCard/1/happy (11).jpg',
        '/static/img/PhotoCard/1/happy (14).jpg',
        '/static/img/PhotoCard/2/game (17).jpg',
        '/static/img/PhotoCard/2/happy (3).jpg',
        '/static/img/PhotoCard/2/happy (6).jpg',
        '/static/img/PhotoCard/2/manga (20).jpg',
        '/static/img/PhotoCard/2/manga (26).jpg',
        '/static/img/PhotoCard/2/space (1).jpg',
        '/static/img/PhotoCard/2/space (18).jpg',
        '/static/img/PhotoCard/2/space (20).jpg',
        // preload Main
        './components/Main/images/bg.jpg'
      ]);
      function preload (arrs) {
        let startTime = new Date().getTime();
        for (let i = 0; i < arrs.length; i++) {
          images[i] = new Image();
          images[i].src = arrs[i];
        }
        let endTime = new Date().getTime();
        if (endTime - startTime < 1500) {
          setTimeout(() => {
            _this.ifload = true;
          }, 2000);
        } else {
          _this.ifload = true;
        }
      }
    },
    login () {
      this.$refs.nav.showHead = true;
    },
    getUserId () {
      this.$http.post('/api/login', {'act': 'getLoginUser'}).then((res) => {
        let data = res.data;
        let userId = parseInt(data.user_id);
        this.freshUserid(userId);
      });
    }
  },
  mounted () {
    this.preloading();
    this.getUserId();
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
