<template>
  <div class="totop" v-show="top>screenH" @click="toTop"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ToTop',
  data () {
    return {
      top: 0,
      screenH: document.documentElement.clientHeight || document.body.clientHeight
    };
  },
  methods: {
    scroll () {
      let _this = this;
      document.addEventListener('scroll', function () {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        _this.top = top;
      }, false);
    },
    toTop () {
      this.$emit('totop', '');
    }
  },
  activated () {
    this.scroll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .totop
    width 50px
    height 50px
    background url("./images/toTop.png") no-repeat center
    position fixed
    bottom 50px
    right 50px
    background-size cover
    cursor pointer
    transition 0.25s
    &:hover
      background-image url("./images/toTop2.png")
</style>
