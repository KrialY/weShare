<template>
  <div class="introduce screenHeight">
    <section class="wrapper screenHeight step1">
      <PhotoCard :imgs="photoCard"></PhotoCard>
    </section>
    <section class="wrapper screenHeight step2">
      <PhoneView :auto="true" :status="1" ref="phone" :bottom="'-60%'"></PhoneView>
    </section>
    <section class="wrapper screenHeight step3">3333333</section>
    <section class="wrapper screenHeight step4">
      <PhotoCard :imgs="photoCard2"></PhotoCard>
    </section>
    <Foot ref="foot"></Foot>
    <div class="scroolTip"></div>
  </div>
</template>
<script type="text/ecmascript-6">
/* global $:true */
import utils from './../../common/js/util';
import Foot from './../../components/Foot/Foot.vue';
import PhotoCard from './../../components/PhotoCard/PhotoCard.vue';
import PhoneView from './../../components/PhoneView/PhoneView.vue';

export default {
  name: 'Introduce',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      screenH: 0,
      num: 0,
      phoneLeft: '621.5px',
      photoCard: ['static/img/PhotoCard/1/game (4).jpg', 'static/img/PhotoCard/1/game (5).jpg', 'static/img/PhotoCard/1/game (6).jpg', 'static/img/PhotoCard/1/game (16).jpg', 'static/img/PhotoCard/1/happy (11).jpg'],
      photoCard2: ['static/img/PhotoCard/2/space (1).jpg', 'static/img/PhotoCard/2/space (18).jpg', 'static/img/PhotoCard/2/space (20).jpg', 'static/img/PhotoCard/2/manga (20).jpg']
    };
  },
  methods: {
    init () {
      let screenHeights = document.getElementsByClassName('screenHeight');
      this.screenH = utils.screenHeight(screenHeights);
    },
    scrool () {
      $('.introduce').animate({scrollTop: this.nowH}, 600, 'easeInOutCubic');
    },
    numControl () {
      let _this = this;
      $(document).on('mousewheel DOMMouseScroll', scrollEve);

      function scrollEve (e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
        if (delta > 0) {
          // 向上滚
          $(document).off('mousewheel DOMMouseScroll');
          _this.num--;
          if (_this.num < 0) _this.num = 0;
          setTimeout(function () {
            $(document).on('mousewheel DOMMouseScroll', scrollEve);
          }, 500);
        } else if (delta < 0) {
          // 向下滚
          $(document).off('mousewheel DOMMouseScroll');
          _this.num++;
          if (_this.num >= $('.screenHeight').length) _this.num = $('.screenHeight').length - 1;
          setTimeout(function () {
            $(document).on('mousewheel DOMMouseScroll', scrollEve);
          }, 500);
        }
        e.preventDefault();
      }
    }
  },
  computed: {
    nowH () {
      if (this.num === $('.screenHeight').length - 1) {
        return this.screenH * (this.num - 1) + this.$refs.foot.footH;
      }
      return this.screenH * this.num;
    }
  },
  watch: {
    'num': {
      handler () {
        this.scrool();
      }
    }
  },
  mounted () {
    this.init();
    this.scrool();
    this.numControl();
  },
  components: {
    Foot,
    PhotoCard,
    PhoneView
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .introduce
    background url("./images/bg.jpg") no-repeat center;
    background-size: cover;
    background-attachment: fixed;
    overflow hidden
    .wrapper
    .step1
      background rgba(0,0,0,0)
    .step2
      position relative
      background rgba(0,0,0,0)
    .step3
      background rgba(0,0,0,0)
    .step4
      background rgba(0,0,0,0)
    .scroolTip
      width 35px
      height 35px
      background url("./images/arrow.png") no-repeat center
      opacity 0.5
      position fixed
      bottom  50px
      left calc(5rem - 18px)
      background-size contain
      -webkit-animation arrow 2s infinite
      animation arrow 2s infinite
      @keyframes  arrow
        0%
          opacity: 0;
          -webkit-transform: translateY(-20px);
          transform: translateY(-20px);
        50%
          opacity: 1;
          -webkit-transform: translateY(0rem);
          transform: translateY(0rem);
        100%
          opacity: 0;
          -webkit-transform: translateY(10px);
          transform: translateY(10px);
</style>
