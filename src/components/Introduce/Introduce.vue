<template>
  <div class="introduce screenHeight">
    <div class="logo">WeShare</div>
    <transition name="fade">
      <div class="info1" v-show="isInfo1Show">旨在分享国内的高质量大图</div>
    </transition>
    <transition name="fade">
      <div class="info2" v-show="isInfo2Show">它们出自国内各地优秀摄影师与设计师之手</div>
    </transition>
    <transition name="fade">
      <div class="info3" v-show="isInfo3Show">你可以在这里免费获取他们的杰作</div>
    </transition>
    <transition name="fade">
      <div class="info4" v-show="isInfo4Show">这里是高质量图片的天堂</div>
    </transition>
    <transition name="fade">
      <div class="info5" v-show="isInfo5Show">
        <a href="#/main"> Let's Start!</a>
      </div>
    </transition>
    <section class="wrapper screenHeight">
      <div class="page-wrapper animate">
        <div class="page1" v-if="screenH!=0" :style="`height:${screenH}px`">
          <img src="http://qd6i9m6la.bkt.clouddn.com/img5.jpg" style="width: 100%;" :height="screenH">
        </div>
      </div>
      <div class="page-wrapper animate">
        <div class="page2" v-if="screenH!=0" :style="`height:${screenH}px`">
          <img src="http://qd6i9m6la.bkt.clouddn.com/img4.jpg" style="width: 100%;" :height="screenH">
        </div>
      </div>
      <div class="page-wrapper animate">
        <div class="page3" v-if="screenH!=0" width="1000" :style="`height:${screenH}px`">
          <img src="http://qd6i9m6la.bkt.clouddn.com/img3.jpg" style="width: 100%;" :height="screenH">
        </div>
      </div>
      <div class="page-wrapper animate">
        <div class="page4" v-if="screenH!=0" :style="`height:${screenH}px`">
          <img src="http://qd6i9m6la.bkt.clouddn.com/img2.jpg" style="width: 100%;" :height="screenH">
        </div>
      </div>
      <div class="page-wrapper animate">
        <div class="page5" v-if="screenH!=0" :style="`height:${screenH}px`">
          <img src="http://qd6i9m6la.bkt.clouddn.com/img1.jpg" style="width: 100%;" :height="screenH">
        </div>
      </div>
    </section>
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
      screenH: 0,
      num: 0
    };
  },
  methods: {
    init () {
      let othis = this;
      let screenHeights = document.getElementsByClassName('screenHeight');
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      this.screenH = utils.screenHeight(screenHeights);
      this.$nextTick(() => {
        $('.animate').click(function () {
          if (othis.checkIE()) {
            $(this).animate({width: w - 160}, 400);
            $(this).siblings('div').animate({width: '40px'}, 400);
          } else {
            $(this).siblings('div').css('width', '40px');
            $(this).css('width', 'calc(10rem - 160px)');
          }
          othis.num = $(this).index();
        });
      });
    },
    checkIE () {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
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
          if (_this.num >= 4) _this.num = 4;
          setTimeout(function () {
            $(document).on('mousewheel DOMMouseScroll', scrollEve);
          }, 200);
        }
        console.log(_this.num);
        e.preventDefault();
      }
    }
  },
  computed: {
    isInfo1Show () {
      if (this.num === 0) {
        return true;
      } else {
        return false;
      }
    },
    isInfo2Show () {
      if (this.num === 1) {
        return true;
      } else {
        return false;
      }
    },
    isInfo3Show () {
      if (this.num === 2) {
        return true;
      } else {
        return false;
      }
    },
    isInfo4Show () {
      if (this.num === 3) {
        return true;
      } else {
        return false;
      }
    },
    isInfo5Show () {
      if (this.num === 4) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    'num': {
      handler () {
        $('.animate').eq(this.num).trigger('click');
      }
    }
  },
  mounted () {
    this.init();
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
  .fade-enter-active
    opacity 1
    transform translateY(0)
  .fade-enter-active
    transition: 1.5s
  .fade-leave-active
    transition: .5s
  .fade-enter,.fade-leave-active
    opacity 0
    transform translateY(20px)
  .introduce
    overflow hidden
    .logo
      font-size 80px
      position absolute
      left calc(5rem - 150px)
      top 100px
      color rgba(0,0,0,0)
      -webkit-text-stroke: 2px black
    .info1
      font-size 35px
      position absolute
      left calc(5rem - 200px)
      top 300px
      color white
    .info2
      font-size 35px
      position absolute
      left calc(5rem - 300px)
      top 300px
      color white
    .info3
      font-size 35px
      position absolute
      left calc(5rem - 250px)
      top 300px
      color white
    .info4
      font-size 35px
      position absolute
      left calc(5rem - 170px)
      top 300px
      color white
    .info5
      font-size 35px
      position absolute
      left calc(5rem - 80px)
      top 300px
      color white
      a
        color white
    .wrapper
      .page-wrapper
        float left
        overflow hidden
        width 40px
        transition .5s cubic-bezier(0.77, 0, 0.175, 1)
        &:nth-of-type(1)
          width calc(10rem - 160px)
        .page1
          width 10rem
          background-size cover
          cursor pointer
          float left
        .page2
          width 10rem
          background-size cover
          cursor pointer
          float left
        .page3
          width 10rem
          background-size cover
          cursor pointer
          float left
        .page4
          width 10rem
          background-size cover
          cursor pointer
          float left
        .page5
          width 10rem
          background-size cover
          cursor pointer
          float left
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
