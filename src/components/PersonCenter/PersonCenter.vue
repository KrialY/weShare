<template>
  <div class="personcenter">
    <section class="container">
      <div class="head"></div>
      <p class="name">{{personUser}}</p>
      <p class="email">Email: {{personEmail}}</p>
    </section>
    <section class="container">
      <ul class="select">
        <li :class="{active:active==0}" @click="getLikeData">喜欢</li>
        <li :class="{active:active==1}" @click="getCollectData">收藏</li>
        <li :class="{active:active==2}" @click="getUploadData">上传的图片</li>
      </ul>
    </section>
    <div class="imgContent container">
      <h3 style="color: #666;" v-show="personal.length<=0">什么都找不到 (／‵Д′)／~ ╧╧</h3>
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

export default {
  name: 'PersonCenter',
  data () {
    return {
      active: 0,
      shadowData: {
        src: '',
        contributor: '',
        likeType: 0,
        collectType: 0
      },
      personUser: '',
      personEmail: ''
    };
  },
  computed: mapGetters([
    'personal',
    'userId'
  ]),
  methods: {
    ...mapActions([
      'freshPersonalData'
    ]),
    showShadow () {
      console.log(this.personal);
      this.$refs.shadow.ifshow = true;
    },
    checkUser () {
      this.$http.post('/api/login', {'act': 'getLoginUser'}).then((res) => {
        let data = res.data;
        let userId = parseInt(this.userId);
        console.log(data);
        if (userId === -1) {
          this.$router.replace({path: '/main'});
          return;
        }
        this.personUser = data.username;
        this.personEmail = data.email;
        this.initData();
      });
    },
    initData () {
      this.$http.post('/api/getLike', {userId: this.userId}).then((res) => {
        let data = res.data;
        this.freshPersonalData(data);
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
  activated () {
    this.checkUser();
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
    .imgContent
      margin-bottom 150px;
    .head
      width: 150px;
      height: 150px;
      border-radius: 75px;
      background: #666;
      background-size: cover;
      float: left;
      margin-left: calc(50% - 140px);
      margin-right: 30px;
    .name
      font-size: 36px;
      font-weight: bold;
      margin-top: 25px;
    .email
      font-size: 18px;
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
