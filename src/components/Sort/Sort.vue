<template>
  <div class="sort">
    <div class="container-fluid">
      <div class="row">
        <CategoryBar v-for="(bar,index) in bars" :title="bar.typename" :src="bar.typeSrc" :val="bar.ID" :key="index" @get-val="getVal"></CategoryBar>
      </div>
    </div>
    <div class="imgContent container">
      <h1>{{nowTitle}}</h1>
      <h4 style="margin-top: 20px;"><span>{{nowTotal}}</span>张免费下载的{{nowTitle}}图片</h4>
      <h3 style="color: #666;height: 250px;" v-show="sort.length<=0">
        <el-alert
          title="什么都找不到 (／‵Д′)／~ ╧╧"
          :closable="false"
          type="info">
        </el-alert>
      </h3>
      <PhotoWalls v-show="sort.length>0" ref="photowalls" :imgs="sort" :parent="'sort'" @show-shadow="showShadow" :userId="userId"></PhotoWalls>
      <Shadow ref="shadow" :parent="'sort'"></Shadow>
      <ToTop @totop="toTop"></ToTop>
    </div>
    <Foot :styleType="1"></Foot>
  </div>
</template>

<script type="text/ecmascript-6">
/* global $:true */
import { mapActions, mapGetters } from 'vuex';
import CategoryBar from '../CategoryBar/CategoryBar.vue';
import PhotoWalls from '../PhotoWalls/PhotoWalls.vue';
import Shadow from '../Shadow/Shadow.vue';
import ToTop from '../ToTop/ToTop.vue';
import Foot from './../../components/Foot/Foot.vue';
export default {
  name: 'Sort',
  data () {
    return {
      queryID: 1,
      bars: [],
      barsSrc: ['static/img/kinds_imgs/kinds_food.jpg', 'static/img/kinds_imgs/kinds_animal.jpg', 'static/img/kinds_imgs/kinds_nature.jpg', 'static/img/kinds_imgs/kinds_man.jpg', 'static/img/kinds_imgs/kinds_simple.jpg', 'static/img/kinds_imgs/kinds_sky.jpg', 'static/img/kinds_imgs/kinds_city.jpg', 'static/img/kinds_imgs/kinds_comic.jpg', 'static/img/kinds_imgs/kinds_game.jpg', 'static/img/kinds_imgs/kinds_space.jpg', 'static/img/kinds_imgs/kinds_healthy.jpg', 'static/img/kinds_imgs/kinds_happy.jpg'],
      nowTitle: '',
      nowTotal: '',
      shadowData: {
        src: '',
        contributor: '',
        likeType: 0,
        collectType: 0
      }
    };
  },
  components: {
    CategoryBar,
    PhotoWalls,
    Shadow,
    ToTop,
    Foot
  },
  methods: {
    ...mapActions([
      'freshSortData'
    ]),
    getVal (queryID) {
      this.queryID = queryID;
      this.$http.post(`/api/getTypeImgs`, {type: this.queryID}).then((res) => {
        let data = res.data;
        this.nowTitle = this.bars[this.queryIndex].typename;
        this.nowTotal = this.bars[this.queryIndex].total;
        this.freshSortData(data);
      });
    },
    showShadow () {
      this.$refs.shadow.ifshow = true;
    },
    toTop () {
      $('html').animate({scrollTop: 0}, 600, 'easeInOutCubic');
    },
    init () {
      this.$http.post('/api/getTypes').then((res) => {
        this.bars = res.data;

        for (let i = 0; i < this.bars.length; i++) {
          this.bars[i].typeSrc = this.barsSrc[i];
        }
        this.$http.post(`/api/getTypeImgs`, {type: this.queryID}).then((res) => {
          let data = res.data;
          this.nowTitle = this.bars[this.queryIndex].typename;
          this.nowTotal = this.bars[this.queryIndex].total;
          this.freshSortData(data);
        });
      });
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'sort'
    ]),
    queryIndex () {
      for (let i = 0; i < this.bars.length; i++) {
        let item = this.bars[i];
        if (item.ID === this.queryID) return i;
      }
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
  .sort
    padding-top 60px
    background #fff
    .imgContent
      margin-top 50px
      margin-bottom 100px;
</style>
