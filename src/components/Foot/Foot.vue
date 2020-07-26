<template>
  <div class="foot container-fluid" :class="{whiteStyle:styleType===1}" ref="foot">
    <p><a href="https://mail.qq.com">联系我们：KrialY.code@gmail.com</a></p>
    <p>Copyright &copy; 2019 WeShare - All RIghts Reserved.</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Foot',
  props: {
    styleType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    footH () {
      return this.$refs.foot.offsetHeight;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .foot
    height 200px
    background rgba(0,0,0,0.8)
    color #fff
    &.whiteStyle
      background #fff
      color #666
      border-top 1px solid #ddd
      a
        color #666
    p
      width: 100%
      text-align center
      margin-top 10px
      &:nth-of-type(1)
        margin-top 80px
      a
        text-decoration none
        color white
        &:hover
          text-decoration underline

</style>
