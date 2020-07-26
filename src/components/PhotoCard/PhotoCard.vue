<template>
  <div class="photocard" ref="cardWrapper"></div>
</template>

<script>
import Shower from '../../common/js/photocard';
export default {
  name: 'PhotoCard',
  props: {
    imgs: {
      type: Array,
      default () {
        return [];
      }
    },
    x: {
      type: Number,
      default () {
        return document.documentElement.clientWidth / 2 - 50;
      }
    },
    y: {
      type: Number,
      default () {
        return document.documentElement.clientHeight / 2 - 25;
      }
    }
  },
  data () {
    return {
      showers: [],
      showerArr: []
    };
  },
  methods: {
    init () {
      for (let i = 0; i < this.imgs.length; i++) {
        var odivPar = document.createElement('div');
        var odiv = document.createElement('div');
        odivPar.className = 'block';
        odiv.className = 'showimg';
        odiv.style.background = "url('" + this.imgs[i % this.imgs.length] + "') no-repeat center";
        odiv.style.backgroundSize = 'cover';
        odivPar.style.left = this.x + 'px';
        odivPar.style.top = this.y + 'px';
        odivPar.appendChild(odiv);
        this.$refs.cardWrapper.appendChild(odivPar);
        this.showers[i] = odivPar;
      }

      for (let i = 0; i < this.imgs.length; i++) {
        this.showerArr[i] = new Shower(this.showers[i]);
        this.showerArr[i].toRandom(this.showerArr[i].obj);
        this.showerArr[i].drag();
        this.showerArr[i].hover();
        this.showerArr[i].moveRandom();
      }
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .photocard
    position relative
    .block
      width 170px
      height 110px
      background white
      position absolute
      left 300px
      top 300px
      cursor pointer
      transform rotateZ(50deg)
      transition transform 1s
      opacity 0.85
      .showimg
        background no-repeat center
        background-size cover
        width 160px
        height 100px
        margin 5px 0 0 5px
</style>
