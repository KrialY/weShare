<template>
  <div class="preloading" ref="preloadingWrapper">
    <h1>WeShare</h1>
    <h2>生活热爱分享-Thousands Find</h2>
    <div class="skype-loader">
      <div class="dot">
        <div class="first"></div>
      </div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <h3>Loading...</h3>
  </div>
</template>

<script type="text/ecmascript-6">
import utils from './../../common/js/util';
export default {
  name: 'Preloading',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: {
    init () {
      utils.screenHeight(this.$refs.preloadingWrapper);
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .preloading
    position fixed
    width 100%
    top 0
    background #F7FAFC
    z-index 10000
    h1
      position: absolute
      padding 0
      margin 0
      font-size 55px
      color rgba(15,136,235,0.7)
      font-weight normal
      margin-bottom 20px
      text-align center
      left calc(50% - 110px)
      top calc(50% - 250px)
    h2
      position: absolute
      padding 0
      margin 0
      font-size 16px
      color rgba(0,0,0,0.7)
      font-weight normal
      margin-bottom 20px
      text-align center
      left calc(50% - 110px)
      top calc(50% - 170px)
    h3
      position: absolute
      font-size 16px
      left calc(50% - 32px)
      top 50%
    .skype-loader
      width: 80px
      height: 80px;
      position: relative;
      left calc(50% - 40px)
      top calc(50% - 100px)
      @keyframes dotrotate
        0%
          transform: rotate(0deg);
          transform: rotate(360deg);
        100%
      @keyframes dotscale
        0%, 10%
          width: 16px;
          height: 16px;
          margin-left: -8px
          margin-top: -4px
        50%
          width: 8px
          height: 8px
          margin-left: -4px
          margin-top: 0
        90%, 100%
          width: 16px
          height: 16px
          margin-left: -8px
          margin-top: -4px
      .dot
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        animation: 1.7s dotrotate cubic-bezier(0.775, 0.005, 0.310, 1.000) infinite;
        &:nth-child(1)
          animation-delay: 0.2s;
        &:nth-child(2)
          animation-delay: 0.35s;
        &:nth-child(3)
          animation-delay: 0.45s;
        &:nth-child(4)
          animation-delay: 0.55s;
        &:after,& .first
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background: black;
          border-radius: 50%;
          left: 50%;
          margin-left: -4px;
        .first
          background: #000;
          margin-top: -4px;
          animation: 1.7s dotscale cubic-bezier(0.775, 0.005, 0.310, 1.000) infinite;
          animation-delay: 0.2s;
</style>
