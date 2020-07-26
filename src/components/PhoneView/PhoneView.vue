<template>
  <div class="phoneview" ref="phoneWrapper">
    <div class="iponeContent" ref="phoneContent" :style="`background-image:url('${src}')`"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'PhoneView',
  props: {
    auto: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: String,
      default: '0'
    },
    left: {
      type: String,
      default: '0'
    },
    status: {
      type: Number,
      default: 1
    },
    src: {
      type: String,
      default: '/static/img/photos/collect/game (2).jpg'
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      num: this.status,
      arr: [{
        w: '9.5rem',
        h: 'calc(100% - 70px)',
        pad: '0'
      }, {
        w: 1.9 + 'rem',
        h: 4 + 'rem',
        pad: '0.58rem 0.1rem 0.5rem 0.1rem'
      }, {
        w: 4 + 'rem',
        h: 1.9 + 'rem',
        pad: '0.2rem 0.49rem 0.08rem 0.48rem'
      }, {
        w: 4.55 + 'rem',
        h: 3.5 + 'rem',
        pad: '0.43rem 0.35rem 0.4rem 0.28rem'
      }, {
        w: 3.5 + 'rem',
        h: 4.55 + 'rem',
        pad: '0.38rem 0.21rem 0.43rem 0.21rem'
      }]
    };
  },
  methods: {
    autoGo () {
      if (this.auto) {
        let oiphone = this.$refs.phoneWrapper;
        oiphone.timer = setInterval(() => {
          this.num++;
          if (this.num >= this.arr.length) this.num = 1;
        }, 3000);
      }
    },
    init () {
      this.changeStatus();
    },
    changeStatus () {
      let oiphone = this.$refs.phoneWrapper;
      this.$refs.phoneWrapper.style.left = this.left;
      this.$refs.phoneWrapper.style.bottom = this.bottom;
      oiphone.style.width = this.arr[this.num].w;
      oiphone.style.height = this.arr[this.num].h;
      oiphone.style.padding = this.arr[this.num].pad;
      oiphone.style.backgroundImage = 'url("/static/img/phone/iphone' + (this.num - 1) + '.png")';
    }
  },
  watch: {
    'num': {
      handler () {
        this.changeStatus();
      }
    },
    'status': {
      handler (val) {
        this.num = val;
      }
    }
  },
  mounted () {
    this.init();
    this.autoGo();
  },
  computed: {
    phoneW () {
      return this.$refs.phoneWrapper.offsetHeight;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .phoneview
    opacity 1
    width 1.9rem
    height 4rem
    background url("/static/img/phone/iphone0.png") no-repeat center
    background-size contain
    position absolute
    transition 0.5s
    padding 0.58rem 0.1rem 0.5rem 0.1rem
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    .iponeContent
      width 100%
      height 100%
      background no-repeat center
      background-size cover
      opacity 1
      transition 0.5s
</style>
