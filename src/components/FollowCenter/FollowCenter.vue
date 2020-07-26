<template>
  <div class="followcenter">
    <div class="info-title" style="margin-bottom: 10px;">{{infoTitle}}</div>
    <section class="container">
      <el-alert
        v-show="contactData.length<=0"
        title="没有数据哦~"
        type="info">
      </el-alert>
      <a
        v-for="(item,i) in contactData"
        :href="parseInt(item.ID) === parseInt(userId) ? `#/personcenter` : `#/usercenter?uploader=${item.ID}`"
        :key="i"
        class="contact-container">
        <div class="avatar" :style="`background-image:url('${PATH}${item.avatar}');`"></div>
        <div class="username">{{item.username}}</div>
      </a>
    </section>
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
  name: 'FollowCenter',
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
      contactData: [],
      queryData: utils.querystring2obj(window.location.href)
    };
  },
  computed: {
    ...mapGetters([
      'personal',
      'userId'
    ]),
    infoTitle () {
      if (this.queryData.act === 'user') {
        if (typeof (this.queryData.strangerID) !== 'undefined') {
          return '他的关注';
        } else {
          return '我的关注';
        }
      } else if (this.queryData.act === 'fans') {
        if (typeof (this.queryData.strangerID) !== 'undefined') {
          return '他的粉丝';
        } else {
          return '我的粉丝';
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'freshPersonalData'
    ]),
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
            othis.initData();
          }
        });
      } else {
        this.$router.replace({path: '/main'});
      }
    },
    initData () {
      let othis = this;
      let queryData = utils.querystring2obj(window.location.href);
      let ID = othis.userId;

      if (typeof (queryData.strangerID) !== 'undefined') {
        ID = queryData.strangerID;
      }
      this.$http.post('/api/getFans', {act: queryData.act, userID: ID}).then((res) => {
        let data = res.data;
        console.log(data);
        if (data.length >= 0) {
          othis.contactData = data;
        }
      });
    }
  },
  activated () {
    // this.checkUser();
    this.initData();
    this.queryData = utils.querystring2obj(window.location.href);
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

  .followcenter
    margin-top 100px
    .info-title
      text-align center
      font-size 20px
      margin-bottom 5px
    .container
      min-height 350px
      .contact-container
        cursor pointer
        float left
        padding 10px
        color black
        &:hover
          text-decoration none
        &:hover .username
          color #2177C7

        .avatar
          width 80px
          height 80px
          border-radius 50%
          background #666;
          background-size cover
        .username
          width 80px
          text-align center
          margin-top 10px
</style>
