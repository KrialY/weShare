<template>
  <section class="photowall" ref="wallWrapper" :style="`height:${h}px`" @click="sendImgSrc">
    <a href="javascript:void(0)" :style="`background-image:url('${PATH}${src}');`"></a>
    <p></p>
    <p class="download" @click.stop>
      <a :href="`/api/download?fname=${src}`"></a>
    </p>
    <p class="contributor">{{contributor}}</p>
    <p class="like" :class="{unlike:myLikeType==1}" @click.stop="triggleLike">
      <span></span>
      <span>{{likeMsg}}</span>
    </p>
    <p class="collect" :class="{uncollect:myCollectType==1}" @click.stop="triggleCollect">
      <span></span>
      <span>{{collectMsg}}</span>
    </p>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex';

const PATH = '/static/upload/';
export default {
  name: 'PhotoWall',
  props: {
    parent: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    contributor: {
      type: String
    },
    h: {
      type: Number,
      default: 300
    },
    likeType: {
      type: Number,
      default: 0
    },
    collectType: {
      type: Number,
      default: 0
    },
    ID: {
      type: Number,
      default: -1
    },
    UPLOADID: {
      type: Number,
      default: -1
    },
    loginUser: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      PATH: PATH,
      myLikeType: this.likeType,
      myCollectType: this.collectType
    };
  },
  computed: {
    ...mapGetters([
      'shadowsRecommend'
    ]),
    likeMsg () {
      if (this.myLikeType === 0) return '喜欢';
      return '取消喜欢';
    },
    collectMsg () {
      if (this.myCollectType === 0) return '收藏';
      return '取消收藏';
    }
  },
  methods: {
    ...mapActions([
      'sendShadowData',
      'changeOwn'
    ]),
    sendImgSrc: function () {
      this.sendShadowData({
        src: this.src,
        contributor: this.contributor,
        likeType: this.myLikeType,
        collectType: this.myCollectType,
        imgId: this.ID,
        loginUser: this.loginUser,
        parent: this.parent
      });
      this.$emit('show-shadow');
    },
    triggleLike () {
      let imgId = this.ID;
      let userId = this.loginUser;
      if (userId === -1) {
        alert('请先登录');
        return;
      }
      if (this.myLikeType === 1) { // 取消喜欢
        let action = 0;
        this.$http.post('/api/modifyLike', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            this.myLikeType = 0;
            this.changeOwn({
              imgId,
              parent: this.parent,
              like: 0
            });
          }
        });
      } else if (this.myLikeType === 0) {
        let action = 1;
        this.$http.post('/api/modifyLike', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            this.myLikeType = 1;
            this.changeOwn({
              imgId,
              parent: this.parent,
              like: 1
            });
          }
        });
      }
    },
    triggleCollect () {
      let imgId = this.ID;
      let userId = this.loginUser;
      if (userId === -1) {
        alert('请先登录');
        return;
      }
      if (this.myCollectType === 1) {
        let action = 0;
        this.$http.post('/api/modifyCollect', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            this.myCollectType = 0;
            this.changeOwn({
              imgId,
              parent: this.parent,
              collect: 0
            });
          }
        });
      } else if (this.myCollectType === 0) {
        let action = 1;
        this.$http.post('/api/modifyCollect', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            this.myCollectType = 1;
            this.changeOwn({
              imgId,
              parent: this.parent,
              collect: 1
            });
          }
        });
      }
    }
  },
  watch: {
    'likeType': {
      handler (val) {
        this.myLikeType = val;
      }
    },
    'collectType': {
      handler (val) {
        this.myCollectType = val;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .photowall
    width 100%
    height 300px
    position relative
    margin-bottom 10px
    opacity 1
    &:hover
      a
        box-shadow 0 3px 8px 2px rgba(0,0,0,0.6)
      .collect,.like,p:nth-of-type(1),.download,.contributor
        opacity 1
    .download
      width 35px
      height 30px
      background rgba(233,233,233,0.65) url("./images/download_icon.png") no-repeat center
      position absolute
      right 15px
      bottom 15px
      border-radius 4px
      opacity 0
      cursor pointer
      a
        cursor pointer
        box-shadow none
      &:hover
        background-color: rgba(233,233,233,1)
    .contributor
      opacity 0
      color white
      width 35px
      height 30px
      line-height 30px
      text-indent 50px
      border-radius 15px
      background url("./images/contributor.jpg") no-repeat center
      background-size cover
      position absolute
      left 15px
      bottom 15px
    .like
      width 70px
      height 30px
      top 10px
      right 10px
      border-radius 3px
      padding 5px 8px
      box-sizing border-box
      background rgba(233,233,233,0.65)
      cursor pointer
      opacity 0
      transition 0.5s
      &.unlike
        font-size 12px
        width 85px
        line-height 16px
        padding 5px 4px
        span:nth-of-type(1)
          background-image url("./images/unlike.png")
        span:nth-of-type(2)
          width 55px
      &:hover
        background-color rgba(233,233,233,1)
      span:nth-of-type(1)
        display block
        width 17px
        height 20px
        background url("./images/like.png") no-repeat center
        background-size contain
        float left
      span:nth-of-type(2)
        display block
        width 30px
        height 30px
        float left
        margin-left 5px
        margin-top 3px
    .collect
      width 70px
      height 30px
      opacity 0
      top 10px
      right 100px
      border-radius 3px
      padding 5px 8px
      box-sizing border-box
      background rgba(233,233,233,0.65)
      cursor pointer
      transition 0.5s
      &.uncollect
        font-size 12px
        width 85px
        line-height 16px
        padding 5px 6px
        span:nth-of-type(1)
          background-image url("./images/uncollect.png")
        span:nth-of-type(2)
          width 55px
          margin-left 4px
      &:hover
        background-color rgba(233,233,233,1)
      span:nth-of-type(1)
        display block
        width 14px
        height 14px
        background url("./images/collect.png") no-repeat center
        background-size contain
        float left
        margin-top 2px
      span:nth-of-type(2)
        display block
        width 30px
        height 30px
        float left
        margin-left 5px
        margin-top 3px
    a
      text-decoration none
      display block
      width 100%
      height 100%
      background no-repeat center
      background-size cover
      cursor zoom-in
      transition 0.5s
    p
      width 100%
      height 100px
      position absolute
      margin-bottom 0
      bottom 0
      background linear-gradient(to top,rgba(0,0,0,0.15),rgba(0,0,0,0))
      transition 0.5s
      opacity 0
</style>
