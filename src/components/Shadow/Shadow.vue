<template>
  <transition name="fade">
    <div class="shadow" v-show="ifshow" @contextmenu.prevent @click="closeMeanu">
      <PhoneView :status="status" :bottom="'-47px'" :src="`${PATH}${rendShadow.src}`"></PhoneView>
      <div class="barrage">
        <Barrage ref="barrage" v-if="ifshow&&barrageData.length>0&&isBarrageShow&&status===0" :isPause="isBarragePause" :barrageData="barrageData"></Barrage>
      </div>
      <div class="img">
        <div class="infoWrapper" v-show="status===0">
          <p></p>
          <p class="download" @click="triggleLogin">
            <a :href="rendShadow.download"></a>
          </p>
          <el-popover
          class="addContent"
          placement="bottom"
          width="50"
          trigger="hover"
          content="发送你的弹幕吧~">
          <el-button slot="reference" type="primary"  @click="openBarrageInput" size="medium" icon="el-icon-chat-line-round" circle></el-button>
          </el-popover>
          <el-popover
            class="concealBarrage"
            placement="bottom"
            width="50"
            trigger="hover"
            :content="isBarrageShow===true?'隐藏弹幕':'开启弹幕'">
            <el-button
              slot="reference"
              :type="isBarrageShow===true?'primary':''"
              @click="isBarrageShow=!isBarrageShow"
              size="medium"
              icon="el-icon-view"
              circle></el-button>
          </el-popover>
          <el-popover
            class="pauseBarrage"
            placement="bottom"
            width="50"
            trigger="hover"
            :content="isBarragePause?'滚动弹幕':'暂停弹幕'">
              <el-button
                slot="reference"
                :type="isBarragePause?'':'primary'"
                @click="isBarragePause=!isBarragePause"
                size="medium"
                icon="el-icon-video-play"
                v-show="isBarrageShow"
                circle></el-button>
          </el-popover>
          <p class="contributor" :style="`background-image:url('${PATH}${rendShadow.avatar}');`">
            <a :href="`${rendShadow.uploader}`">{{rendShadow.contributor}}</a>
          </p>
          <p class="linerTop"></p>
          <span class="close2" @click="ifshow=false"></span>
          <p style="display: none;" class="like" :class="{unlike:rendShadow.likeType==1}" @click="triggleLike">
            <span></span>
            <span>{{likeMsg}}</span>
          </p>
          <p style="display: none;" class="collect" :class="{uncollect:rendShadow.collectType==1}" @click="triggleCollect">
            <span></span>
            <span>{{collectMsg}}</span>
          </p>
        </div>
      </div>
      <ul class="hidden-xs device">
        <li v-for="(val,index) in 5" :key="index" :class="{active:status===index}" @click="status=index"></li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex';
import PhoneView from '../PhoneView/PhoneView.vue';
import Barrage from '../Barrage/Barrage.vue';
const PATH = '/static/upload/';
export default {
  name: 'Shadow',
  props: {
    parent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      ifshow: false,
      status: 0,
      PATH: PATH,
      avatar: '',
      barrageData: [],
      isBarrageShow: true,
      isBarragePause: false
    };
  },
  computed: {
    ...mapGetters([
      'shadowsRecommend',
      'shadowsSort',
      'shadowsPersonal',
      'userId'
    ]),
    rendShadow () {
      switch (this.parent) {
        case 'recommend':
          return this.shadowsRecommend;
        case 'sort':
          return this.shadowsSort;
        case 'personal':
          return this.shadowsPersonal;
      }
    },
    likeMsg () {
      if (parseInt(this.rendShadow.likeType) === 0) return '喜欢';
      return '取消喜欢';
    },
    collectMsg () {
      if (parseInt(this.rendShadow.collectType) === 0) return '收藏';
      return '取消收藏';
    }
  },
  methods: {
    ...mapActions([
      'freshWalls'
    ]),
    closeMeanu () {
      if (typeof (this.$refs.barrage) !== 'undefined') {
        this.$refs.barrage.isMeanuShow = false;
      }
    },
    initBarrageData () {
      this.$http.post('/api/modifyBarrage', {act: 'getBarrage', imgID: this.rendShadow.imgId}).then((res) => {
        let data = res.data;

        if (data.length > 0) {
          this.barrageData = data;
        } else {
          this.barrageData = [];
        }
      });
    },
    openBarrageInput () {
      if (parseInt(this.userId) === -1) {
        this.$message('请先登录');
        return;
      }
      this.$prompt('请输入内容~', '发射你的弹幕吧~', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.$http.post('/api/modifyBarrage', {act: 'insert', imgID: this.rendShadow.imgId, content: value}).then((res) => {
          let data = res.data;
          let status = data.status;
          if (parseInt(status) === 0) {
            this.$message({
              type: 'success',
              message: '你的弹幕是: ' + value
            });
          } else {
            this.$message.error('弹幕发射失败');
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    triggleLogin () {
      let userId = parseInt(this.rendShadow.loginUser);
      if (userId === -1) {
        this.$message('请先登录');
      }
    },
    triggleLike () {
      let imgId = parseInt(this.rendShadow.imgId);
      let userId = parseInt(this.rendShadow.loginUser);
      let like = parseInt(this.rendShadow.likeType);
      console.log(imgId);
      if (userId === -1) {
        alert('请先登录');
        return;
      }
      if (like === 1) { // 取消喜欢
        let action = 0;
        this.$http.post('/api/modifyLike', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            like = 0;
            this.rendShadow.likeType = 0;
            this.freshWalls({imgId, parent: this.parent});
          }
        });
      } else if (like === 0) {
        let action = 1;
        this.$http.post('/api/modifyLike', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            like = 1;
            this.rendShadow.likeType = 1;
            this.freshWalls({imgId, parent: this.parent});
          }
        });
      }
    },
    triggleCollect () {
      let imgId = parseInt(this.rendShadow.imgId);
      let userId = parseInt(this.rendShadow.loginUser);
      let collect = parseInt(this.rendShadow.collectType);
      if (userId === -1) {
        alert('请先登录');
        return;
      }
      if (collect === 1) {
        let action = 0;
        this.$http.post('/api/modifyCollect', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            collect = 0;
            this.rendShadow.collectType = 0;
            this.freshWalls({imgId, parent: this.parent});
          }
        });
      } else if (collect === 0) {
        let action = 1;
        this.$http.post('/api/modifyCollect', {imgId, userId, action}).then((res) => {
          let data = res.data;
          if (parseInt(data['status']) === 0) {
            collect = 1;
            this.rendShadow.collectType = 1;
            this.freshWalls({imgId, parent: this.parent});
          }
        });
      }
    }
  },
  mounted () {
    this.initBarrageData();
  },
  watch: {
    'ifshow': {
      handler () {
        this.initBarrageData();
        this.isBarragePause = false;
      }
    },
    'isBarrageShow': {
      handler (value) {
        if (value === false) {
          this.isBarragePause = false;
        }
      }
    }
  },
  components: {
    PhoneView,
    Barrage
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
  .shadow
    width 100%
    height 100%
    background rgba(0,0,0,0.7)
    position fixed
    left 0
    top 0
    z-index 10
    .barrage
      width 95%
      height calc(100% - 70px)
      position: absolute
      left 2.5%
      top 50px
    .img
      width 95%
      height calc(100% - 70px)
      position absolute
      left 2.5%
      top 50px
      background no-repeat center
      transition 0.5s
      background-size contain
      position relative
      &:hover
        .infoWrapper
          .collect,.like,p:nth-of-type(1),.contributor,.download,.addContent,.concealBarrage,.pauseBarrage
            opacity 1
      .infoWrapper
        width 100%
        height 100%
        p:nth-of-type(1)
          width 100%
          height 100px
          position absolute
          bottom 0
          background linear-gradient(to top,rgba(0,0,0,0.3),rgba(0,0,0,0))
          transition 0.5s
          opacity 0
          margin-bottom 0
        .addContent
          position absolute
          left 3.5%
          top 3.5%
          cursor pointer
          transition 0.5s
          opacity 0
        .concealBarrage
          position absolute
          left 7.5%
          top 3.5%
          cursor pointer
          transition 0.5s
          opacity 0
        .pauseBarrage
          position absolute
          left 11.5%
          top 3.5%
          cursor pointer
          transition 0.5s
          opacity 0
        .download
          width 35px
          height 30px
          background rgba(233,233,233,0.65) url("./images/download_icon.png") no-repeat center
          position absolute
          right 3.5%
          bottom 3.5%
          border-radius 4px
          opacity 0
          cursor pointer
          transition 0.5s
          a
            display block
            width 100%
            height 100%
          &:hover
            background-color: rgba(233,233,233,1)
        .contributor
          opacity 0
          color white
          width 30px
          height 30px
          line-height 30px
          text-indent 50px
          border-radius 15px
          background url("./images/contributor.jpg") no-repeat center
          background-size cover
          position absolute
          left 3%
          bottom 3%
          transition 0.5s
          a
            cursor pointer
            color white
            &:hover
              text-decoration underline
        .close2
          width 20px
          height 20px
          background url("./images/xx.png") no-repeat center
          background-size cover
          position absolute
          right 3.5%
          top 3.5%
          cursor pointer
          transition 0.5s
          opacity 1
          transform rotateZ(0deg)
          &:hover
            transform rotateZ(180deg)
        .like
          width 70px
          height 30px
          position absolute
          top 30px
          left 30px
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
          position absolute
          width 70px
          height 30px
          opacity 0
          top 30px
          left 120px
          border-radius 3px
          padding 5px 8px
          box-sizing border-box
          background rgba(233,233,233,0.65)
          cursor pointer
          transition 0.5s
          &:hover
            background-color rgba(233,233,233,1)
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
    .device
      position absolute
      width 25px
      left 5px
      top calc(50% - 78px)
      li
        cursor pointer
        width 20px
        height 16px
        background url("./images/mon-spr.png") no-repeat 0px 0px
        margin-top 15px
        &:nth-of-type(1).active
          background-position 0 -15px
        &:nth-of-type(2)
          background url("./images/mon-spr.png") no-repeat -72px 0
          &.active
            background-position -72px -15px
        &:nth-of-type(3)
          background url("./images/mon-spr.png") no-repeat -92px 0
          &.active
            background-position -92px -15px
        &:nth-of-type(4)
          background url("./images/mon-spr.png") no-repeat -50px 0
          &.active
            background-position -50px -15px
        &:nth-of-type(5)
          background url("./images/mon-spr.png") no-repeat -25px 0
          &.active
            background-position -25px -15px

</style>
