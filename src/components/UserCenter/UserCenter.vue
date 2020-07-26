<template>
  <div class="personcenter">
    <section class="container">
      <el-alert
        v-show="uStatus===1"
        title="该用户已被封禁"
        type="error"
        style="margin-bottom: 20px;"
        effect="dark">
      </el-alert>
      <label class="head" :style="`background-image:url('${PATH}${avatar}');`"></label>
      <input class="name" type="text" v-model="personUser" readonly="readonly">
      <div style="float: left;">
        <div style="float: left;width: 50px;margin-left: 5px;font-size: 18px;margin-top: 3px;height: 35px;line-height: 35px;">Email:</div>
        <input class="email" type="text" v-model="personEmail" readonly="readonly">
      </div>
      <div class="follow-container">
        <a
          :href="`#/followcenter?act=user&strangerID=${queryData.uploader}`">
          <div style="color: #666;">关注数</div>
          <div class="subscriber">{{subscriber}}</div>
        </a>
        <a
          :href="`#/followcenter?act=fans&strangerID=${queryData.uploader}`">
          <div style="color: #666;">粉丝数</div>
          <div class="fans">{{fans}}</div>
        </a>
      </div>
      <el-popover
         v-if="isFansDataLoaded"
        style="position: absolute;right: 200px;"
        placement="bottom"
        width="50"
        trigger="hover"
        :content="followTips">
        <el-button slot="reference" @click="follow" :type="followStyle" size="medium" :icon="`el-icon-star-${followStar}`" circle></el-button>
      </el-popover>
    </section>
    <section class="container">
      <ul class="select">
        <li :class="{active:active==0}" @click="getLikeData" v-show="false">喜欢</li>
        <li :class="{active:active==1}" @click="getCollectData" v-show="false">收藏</li>
        <li :class="{active:active==2}" @click="getUploadData">上传的图片</li>
      </ul>
    </section>
    <div class="imgContent container">
      <h3 style="color: #666;" v-show="personal.length<=0">
        <el-alert
          title="什么都找不到 (／‵Д′)／~ ╧╧"
          :closable="false"
          type="info">
        </el-alert>
      </h3>
      <PhotoWalls ref="photowalls" :parent="'personal'" :imgs="personal" :userId="userId" @show-shadow="showShadow"></PhotoWalls>
      <Shadow ref="shadow" :parent="'personal'"></Shadow>
    </div>
    <Foot :styleType="1"></Foot>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex';
import PhotoWalls from '../PhotoWalls/PhotoWalls.vue';
import Shadow from '../Shadow/Shadow.vue';
import Foot from '../Foot/Foot.vue';
import utils from './../../common/js/util';

const PATH = '/static/upload/';
export default {
  name: 'PersonCenter',
  data () {
    return {
      headImg: '',
      imgFile: '',
      option: {
        img: 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png',
        size: 1,
        full: false,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150
      },
      previews: {
      },
      dialogVisible: false,
      active: 2,
      shadowData: {
        src: '',
        contributor: '',
        likeType: 0,
        collectType: 0
      },
      PATH: PATH,
      personUser: '',
      personEmail: '',
      avatar: '',
      isFollowed: false,
      isFansDataLoaded: false,
      subscriber: 0,
      fans: 0,
      queryData: utils.querystring2obj(window.location.href),
      uStatus: 0
    };
  },
  computed: {
    ...mapGetters([
      'personal',
      'userId'
    ]),
    followStyle () {
      if (this.isFollowed) {
        return 'primary';
      } else {
        return ' ';
      }
    },
    followStar () {
      if (this.isFollowed) {
        return 'on';
      } else {
        return 'off';
      }
    },
    followTips () {
      if (this.isFollowed) {
        return '取消关注';
      } else {
        return '关注ta吧~~~';
      }
    }
  },
  methods: {
    ...mapActions([
      'freshPersonalData'
    ]),
    follow () {
      let othis = this;
      let queryData = utils.querystring2obj(window.location.href);
      let act = 'insert';

      if (this.userId === -1) {
        this.$message('请先登录');
        return;
      }
      if (this.isFollowed) {
        act = 'delete';
      } else {
        act = 'insert';
      }
      this.$http.post('/api/alterFollower', {act: act, userID: queryData.uploader, fansID: this.userId}).then((res) => {
        let data = res.data;
        let status = data.status;
        if (parseInt(status) === 0) {
          othis.isFollowed = !othis.isFollowed;
          this.$message({
            showClose: true,
            message: data.info,
            type: 'success'
          });
        } else {
          this.$message.error('操作失败！');
        }
      });
    },
    showShadow () {
      console.log(this.personal);
      this.$refs.shadow.ifshow = true;
    },
    checkUser () {
      var othis = this;
      let queryData = utils.querystring2obj(window.location.href);
      if (!isNaN(parseInt(queryData.uploader)) && parseInt(queryData.uploader) > 0) {
        this.$http.post('/api/getStrangerInfo', {uploader: parseInt(queryData.uploader)}).then((res) => {
          let data = res.data;
          if (parseInt(data.status) === 0) {
            othis.personUser = data.username;
            othis.personEmail = data.email;
            othis.avatar = data.avatar;
            othis.uStatus = parseInt(data.uStatus);
            othis.initData();
          }
        });
      } else {
        this.$router.replace({path: '/main'});
      }
    },
    checkIsFans () {
      let othis = this;
      let queryData = utils.querystring2obj(window.location.href);
      this.$http.post('/api/getFans', {userID: queryData.uploader, fansID: this.userId}).then((res) => {
        let data = res.data;

        if (data.length > 0) {
          othis.isFollowed = true;
        } else {
          othis.isFollowed = false;
        }
        othis.isFansDataLoaded = true;
      });
    },
    initData () {
      let othis = this;
      let queryData = utils.querystring2obj(window.location.href);

      this.$http.post('/api/getUpload', {userId: queryData.uploader}).then((res) => {
        let data = res.data;
        this.freshPersonalData(data);
      });
      this.$http.post('/api/getFans', {act: 'user', userID: queryData.uploader}).then((res) => {
        let data = res.data;
        if (data.length >= 0) {
          othis.subscriber = data.length;
        }
      });
      this.$http.post('/api/getFans', {act: 'fans', userID: queryData.uploader}).then((res) => {
        let data = res.data;
        if (data.length >= 0) {
          othis.fans = data.length;
        }
      });
    },
    getCollectData () {
      this.active = 1;
      this.$http.post('/api/getCollect', {userId: this.userId}).then((res) => {
        let data = res.data;
        this.freshPersonalData(data);
      });
    },
    getLikeData () {
      this.active = 0;
      this.$http.post('/api/getLike', {userId: this.userId}).then((res) => {
        let data = res.data;
        this.freshPersonalData(data);
      });
    },
    getUploadData () {
      this.active = 2;
      this.$http.post('/api/getUpload', {userId: this.userId}).then((res) => {
        let data = res.data;
        this.freshPersonalData(data);
      });
    }
  },
  deactivated () {
    this.$destroy(true);
  },
  activated () {
    this.checkUser();
    this.checkIsFans();
  },
  components: {
    PhotoWalls,
    Shadow,
    Foot
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .personcenter
    margin-top 100px;
    .follow-container
      float left
      width 300px
      margin-left 5px
      margin-top 5px
      a:nth-of-type(1)
        float left
        .subscriber
          margin-left 10px
          margin-top 7px
      a:nth-of-type(2)
        float left
        margin-left 10px
        .fans
          margin-left 10px
          margin-top 7px
    .show-preview
      padding-left: 30px;
      .preview
        overflow: hidden;
        border-radius: 50%;
        border:1px solid #cccccc;
        background: #cccccc;
    .imgContent
      margin-bottom 150px;
    .head
      width: 150px;
      height: 150px;
      border-radius: 75px;
      background: #666;
      background-size: cover;
      float: left;
      margin-left: calc(50% - 190px);
      margin-right: 30px;
    .name
      font-size: 36px;
      font-weight: bold;
      margin-top: 25px;
      display block
      float left
      width 300px
      border-radius 3%
      text-indent 5px
    .email
      font-size: 18px;
      display block
      float: left
      width 250px
      height 35px
      margin-top 3px
      border-radius 3%
      text-indent 5px
    .select
      margin: 50px 0;
      height: 20px;
      li
        float: left;
        font-size: 20px;
        margin-right: 10px;
        cursor: pointer;
        &.active
          color: #2177C7;
</style>
