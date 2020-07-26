<template>
  <ul class="photowalls list_img row" ref="photoWrapper" v-if="true">
    <li v-if="isDataLoaded" v-for="(lis,i) in arr" :key="i">
      <div class="animateWrapper" ref="animateWrapper" v-for="(item,index) in arr[i]" :key="index">
        <PhotoWall :parent="parent" :loginUser="userId" :UPLOADID="item.UPLOADID" :avatar="item.avatar" :ID="item.ID" :src="`${item.src}`" :likeType="item.like" :collectType="item.collect"  :h="parseInt(item.radioH)" @show-shadow="showShadow" :contributor="item.username"></PhotoWall>
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
/* global $:true */
import utils from './../../common/js/util';
import PhotoWall from '../PhotoWall/PhotoWall.vue';

export default {
  name: 'PhotoWalls',
  props: {
    parent: {
      type: String,
      default: ''
    },
    imgs: {
      type: Array,
      default () {
        return [];
      }
    },
    userId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      totalNum: 20,
      onceNum: 10,
      nowNum: 0,
      arr: [[], [], []],
      calH: [0, 0, 0],
      likeCollectType: [],
      likeArr: [],
      collectArr: [],
      isDataLoaded: false
    };
  },
  methods: {
    init () {
      if (this.imgs.length <= 0) return;
      this.calH = [0, 0, 0];
      this.arr = [[], [], []];
      this.nowNum = 0;
      let width = this.$refs.photoWrapper.offsetWidth / 3 - 10;

      for (let i = 0; i < this.onceNum; i++) {
        let img = this.imgs[i % this.imgs.length];
        let radioH = img.height / img.width * width;
        let minIndex = utils.getMinHeight(this.calH);
        this.$set(img, 'radioH', radioH);
        this.arr[minIndex].push(img);
        this.calH[minIndex] += parseInt(radioH);
        this.nowNum++;
      }
      this.$nextTick(() => {
        let animateWrappers = this.$refs.animateWrapper;
        for (let i = 0; i < animateWrappers.length; i++) {
          animateWrappers[i].style.animation = '';
        }
        $(window).trigger('scroll');
      });
    },
    throttle (fn) {
      let startTime = 0;

      return function () {
        let endTime = new Date();
        if (endTime - startTime >= 100) {
          fn.call(this);
          startTime = endTime;
        }
      };
    },
    add () {
      let onoff = true;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (this.calH[utils.getMinHeight(this.calH)] + utils.getTop(this.$refs.photoWrapper) < scrollTop + document.documentElement.clientHeight) {
        if (onoff) {
          let addNum = this.nowNum + this.onceNum;
          addNum = addNum > this.totalNum ? this.totalNum : addNum;

          let width = this.$refs.photoWrapper.offsetWidth / 3 - 10;
          for (let i = this.nowNum; i < addNum; i++) {
            let img = this.imgs[i % this.imgs.length];
            let radioH = img.height / img.width * width;
            let minIndex = utils.getMinHeight(this.calH);
            this.$set(img, 'radioH', radioH);
            this.arr[minIndex].push(img);
            this.calH[minIndex] += parseInt(radioH);
            this.nowNum++;
          }
          onoff = false;
          if (addNum !== this.totalNum) {
            setTimeout(function () {
              onoff = true;
            }, 1000);
          }
        }
      }
    },
    animate () {
      if (this.imgs.length <= 0) return;
      let _this = this;
      this.$nextTick(() => {
        let animateWrappers = this.$refs.animateWrapper;
        window.onscroll = _this.throttle(function () {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          let screenH = document.documentElement.clientHeight || document.body.clientHeight;
          scrollTop = scrollTop + screenH;
          for (let i = 0; i < animateWrappers.length; i++) {
            let top = utils.getTop(animateWrappers[i]);
            if (scrollTop > top) {
              animateWrappers[i].style.animation = 'imgsMove 1.5s forwards';
            }
          }
          _this.add();
        });
        $(window).trigger('scroll');
      });
    },
    showShadow () {
      this.$emit('show-shadow');
    },
    typeArrInit () {
      if (this.userId === -1) {
        for (let i = 0; i < this.imgs.length; i++) {
          this.$set(this.imgs[i], 'like', 0);
          this.$set(this.imgs[i], 'collect', 0);
        }
        return;
      }
      this.$http.post('/api/getLike', {userId: this.userId}).then((res) => {
        let likeData = res.data;
        this.likeArr = likeData;
        for (let i = 0; i < this.imgs.length; i++) {
          this.$set(this.imgs[i], 'like', 0);
          for (let j = 0; j < likeData.length; j++) {
            if (likeData[j].ID === this.imgs[i].ID) {
              this.$set(this.imgs[i], 'like', 1);
              break;
            } else {
              this.$set(this.imgs[i], 'like', 0);
            }
          }
        }
      });
      this.$http.post('/api/getCollect', {userId: this.userId}).then((res) => {
        let collectData = res.data;
        this.collectArr = collectData;

        for (let i = 0; i < this.imgs.length; i++) {
          this.$set(this.imgs[i], 'collect', 0);
          for (let j = 0; j < collectData.length; j++) {
            if (collectData[j].ID === this.imgs[i].ID) {
              this.$set(this.imgs[i], 'collect', 1);
              break;
            } else {
              this.$set(this.imgs[i], 'collect', 0);
            }
          }
        }
      });
    },
    freshTypeArr () {
      for (let i = 0; i < this.imgs.length; i++) {
        for (let j = 0; j < this.likeArr.length; j++) {
          if (this.likeArr[j].ID === this.imgs[i].ID) {
            this.$set(this.imgs[i], 'like', 1);
            break;
          } else {
            this.$set(this.imgs[i], 'like', 0);
          }
        }
      }
      for (let i = 0; i < this.imgs.length; i++) {
        for (let j = 0; j < this.collectArr.length; j++) {
          if (this.collectArr[j].ID === this.imgs[i].ID) {
            this.$set(this.imgs[i], 'collect', 1);
            break;
          } else {
            this.$set(this.imgs[i], 'collect', 0);
          }
        }
      };
    }
  },
  mounted () {
    this.init();
    this.typeArrInit();
    this.isDataLoaded = true;
  },
  components: {
    PhotoWall
  },
  watch: {
    'imgs': {
      handler (val, oldval) {
        // console.log(val.length, oldval.length);
        if (val.length === 0) {
          this.arr = [[], [], []];
          return;
        }
        this.freshTypeArr();
        this.init();
        this.typeArrInit();
        this.animate();
      }
    },
    'userId': {
      handler () {
        this.typeArrInit();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .list_img
    width 100%
    height 100%
    margin-left 0
    li
      width 33%
      box-sizing border-box
      float left
      padding 5px
      overflow hidden
      .animateWrapper
        opacity 0
        @keyframes imgsMove
          0%
            transform translateY(50px)
            opacity 0
          100%
            transform translateX(0)
            opacity 1
</style>
