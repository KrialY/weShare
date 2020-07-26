<template>
  <div class="main" ref="mainWrapper">
    <div class="search container-fluid" v-lazy:background-image="'http://qd6i9m6la.bkt.clouddn.com/bg.jpg'">
      <div class="serach_content">
        <p class="hidden-xs"><span>We</span>Share</p>
        <div style="position: relative;">
          <input type="text" placeholder="美图等你来搜~" class="searchText" v-model="queryWords" @keyup.enter="searchImg">
          <input type="button" value="搜索ing" class="searchBtn hidden-xs" @click="searchImg">
          <input type="button" value="搜索ing" class="searchBtn visible-xs-block miniSearchBtn" @click="searchImg">
        </div>
        <p class="hidden-xs">
          <span>关键词：</span>
          <a href="https://cn.bing.com/images/search?q=人"  target="_blank">人</a>
          <a href="https://cn.bing.com/images/search?q=城市"  target="_blank">城市</a>
          <a href="https://cn.bing.com/images/search?q=自然"  target="_blank">自然</a>
          <a href="https://cn.bing.com/images/search?q=游戏"  target="_blank">游戏</a>
        </p>
      </div>
    </div>
    <div class="imgContent container">
      <h1>
        <span>每日推荐</span>
        <p id="refresh" @click="init"></p>
      </h1>
      <h3 style="color: #666;height: 250px;" v-show="recommend.length<=0">什么都找不到 (／‵Д′)／~ ╧╧</h3>
      <PhotoWalls v-if="isDataLoaded" :parent="'recommend'" v-show="recommend.length>0" ref="photowalls" :imgs="recommend" @show-shadow="showShadow" :userId="userId"></PhotoWalls>
    </div>
    <Foot :styleType="1"></Foot>
    <Shadow ref="shadow" :parent="'recommend'"></Shadow>
    <ToTop @totop="toTop"></ToTop>
  </div>
</template>

<script type="text/ecmascript-6">
/* global $:true */
import { mapActions, mapGetters } from 'vuex';
import Foot from './../../components/Foot/Foot.vue';
import PhotoWalls from '../PhotoWalls/PhotoWalls.vue';
import Shadow from '../Shadow/Shadow.vue';
import ToTop from '../ToTop/ToTop.vue';

export default {
  name: 'Main',
  data () {
    return {
      shadowData: {
        src: '',
        contributor: '',
        likeType: 0,
        collectType: 0
      },
      isDataLoaded: false,
      queryWords: ''
    };
  },
  computed: mapGetters([
    'userId',
    'recommend'
  ]),
  components: {
    Foot,
    PhotoWalls,
    Shadow,
    ToTop
  },
  methods: {
    ...mapActions([
      'freshRecommendData'
    ]),
    searchImg () {
      window.open(`https://cn.bing.com/images/search?q=${this.queryWords}`);
    },
    showShadow () {
      this.$refs.shadow.ifshow = true;
    },
    toTop () {
      $('html').animate({scrollTop: 0}, 600, 'easeInOutCubic');
    },
    init () {
      this.$http.post('/api/getRecommend').then((res) => {
        let data = res.data;
        console.log(data);
        this.freshRecommendData(data);
        this.isDataLoaded = true;
      });
    }
  },
  mounted () {
    this.init();
  },
  activated () {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main
    background #fff
    .search
      width 100%
      height 4.5rem
      background url("http://qd6i9m6la.bkt.clouddn.com/bg.jpg") no-repeat center
      background-size cover
      .serach_content
        position absolute
        width 5.8rem
        height 200px
        left 2.4rem
        top 1.35rem
        input[type=text]
          width 85%
          height 50px
          margin-left 0.25rem
          box-sizing border-box
          padding 5px 15px
          border-radius 5px
          background rgba(245,245,245,0.5)
          border 1px solid rgba(0,0,0,0.3)
          margin-top 20px
          transition 0.5s
          box-shadow 0 0 10px 1px rgba(0,0,0,0.15)
          display inline-block
          font-size 12px
          &:hover
            box-shadow 0 0 10px 1px rgba(0,0,0,0.4)
        input[type=button]
          height 40px
          box-sizing border-box
          border 1px solid rgba(0,0,0,0)
          display inline-block
          padding 8px 15px
          border-radius 5px
          background rgba(255,255,255,0.7)
          box-sizing border-box
          transition 0.5s
          color rgba(0,0,0,0.6)
          position absolute
          top 25px
          font-size 12px
          right 0.7rem
          &:hover
            border 1px solid rgba(0,0,0,0.6)
        input.miniSearchBtn
          right 40%
          top 2rem
          background rgba(0,0,0,0.85)
          color rgba(255,255,255,0.85)
        p:nth-of-type(1)
          font-size 0.36rem
          width 100%
          text-align center
          color rgba(0,0,0,0.7)
        p:nth-of-type(2)
          font-size 0.11rem
          width 100%
          text-align left
          text-indent 40px
          margin-top 10px
          color rgba(0,0,0,1)
          a
            text-decoration none
            color rgba(0,0,0,0.7)
            &:hover
              text-decoration underline
    .imgContent
      h1
        p
          float right
          width 35px
          height 35px
          background url("./images/refresh.png") no-repeat center
          background-size contain
          margin-right 10px
          margin-top 5px
          transform rotateZ(0deg)
          transition 1s
          cursor pointer
          &:hover
            transform rotateZ(360deg)
</style>
