<template>
  <transition name="fade">
    <div class="barrage-wrapper" v-show="isShow">
      <ul class="meanu" v-show="isMeanuShow">
        <li @click="deleteBarrage" v-show="meanuSelected!==null&&meanuSelected.userID===userId">删除</li>
        <li @click="shieldBarrage">屏蔽</li>
      </ul>
      <span
        :style="`border:${item.userID===userId?'1px':'0px'} solid #2177C7;`"
        @contextmenu.prevent="openMenu($event,item)"
        class="barrage"
        v-if="barrageData.length>0"
        v-for="(item,i) in barrageData"
        :key="i">{{item.content}}</span>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
/* global $:true */
import { mapGetters } from 'vuex';
export default {
  name: 'Barrage',
  props: {
    barrageData: {
      type: Array,
      default () {
        return [];
      }
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isPause: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMeanuShow: false,
      meanuSelected: null,
      meanuSelectedObj: null
    };
  },
  methods: {
    deleteBarrage () {
      if (this.meanuSelected === null) {
        return '';
      }
      this.$http.post('/api/modifyBarrage', {act: 'delete', ID: this.meanuSelected.ID}).then((res) => {
        let data = res.data;
        if (parseInt(data.status) === 0) {
          this.$message({
            message: '弹幕删除成功',
            type: 'success'
          });
          this.meanuSelectedObj.style.display = 'none';
        } else {
          this.$message.error('弹幕删除失败');
        }
      });
    },
    shieldBarrage () {
      if (this.meanuSelectedObj === null) {
        return '';
      }
      this.meanuSelectedObj.style.display = 'none';
    },
    barrageLaunch () {
      let num = 0;

      let timer = setInterval(() => {
        num++;
        $('.barrage').eq(num).addClass('move');
        $('.barrage').eq(num).css('top', Math.floor(Math.random() * 10 + 1) * 30 + 'px');
        if (num >= this.barrageData.length) {
          num = 0;
          clearInterval(timer);
        }
      }, 1500);
    },
    openMenu (e, item) {
      let x = e.clientX - 40;
      let y = e.clientY - 40;

      this.meanuSelectedObj = e.target;
      this.meanuSelected = item;
      $('.meanu').css('left', x + 'px');
      $('.meanu').css('top', y + 'px');
      this.isMeanuShow = true;
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  mounted () {
    this.barrageLaunch();
  },
  watch: {
    'isPause': {
      handler () {
        if (this.isPause) {
          $('.barrage').addClass('pause');
        } else {
          $('.barrage').removeClass('pause');
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .fade-enter-active
    opacity 1
  .fade-enter-active,.fade-leave-active
    transition: 0.5s
  .fade-enter,.fade-leave-active
    opacity 0
  @keyframes letGo
    from
      transform: translate3d(0,0,0)
    to
      transform: translate3d(-200vw,0,0)
  .barrage-wrapper
    width 100%
    height 100%
    position relative
    overflow hidden
    .barrage
      font-size 20px
      color #fff
      position absolute
      left 100%
      white-space nowrap
      z-index 10
    .move
      animation letGo 10s linear
      animation-fill-mode forwards
    .pause
      animation-play-state paused
    .meanu
      position absolute
      left 0
      top 0
      color white
      z-index 20
      background rgba(0,0,0,0.9)
      border-radius 5px
      li
        width 80px
        height 30px
        text-align center
        line-height 30px
        cursor pointer
        text-shadow: 0 0 2px rgba(0,0,0,.5)
        &:nth-of-type(1)
          border-radius 5px 5px 0 0
        &:last-of-type
          border-radius 0 0 5px 5px
        &:hover
          background  rgba(255,255,255,0.18)
</style>
