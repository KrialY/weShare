<template>
  <div class="categorybar col-lg-1 col-md-2 col-sm-3 col-xs-4" @click="sendMsg">
    <a href="javascript:void(0)" :style="`background-image:url('${src}')`">
      <p class="shadow">{{title}}</p>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CategoryBar',
  props: {
    title: {
      type: String,
      default: '美食'
    },
    src: {
      type: String,
      default: '/static/img/kinds_imgs/kinds_food.jpg'
    },
    val: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {};
  },
  methods: {
    sendMsg () {
      this.$emit('get-val', this.val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .categorybar
    height 20%
    padding 5px 7px
    a
      color rgba(255,255,255,0.9)
      display block
      width 100%
      height 100%
      background no-repeat center
      background-size cover
      border-radius 6px 6px 2px 2px
      text-decoration none
      transition 0.5s
      &:hover
        color rgba(255,255,255,1)
      .shadow
        width 100%
        height 100%
        box-sizing border-box
        background rgba(0,0,0,0.2)
        border-radius 6px 6px 2px 2px
        text-align center
        line-height 35px
        transition 0.5s
        margin 0
        &:hover
          background rgba(0,0,0,0.4)
</style>
