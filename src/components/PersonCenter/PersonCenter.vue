<template>
  <div class="personcenter">
    <section class="container">
      <label for="uploadAvatar" class="head" :style="`background-image:url('${PATH}${avatar}');`"></label>
      <input class="name" type="text" v-model="personUser" @blur="setUserName">
      <div style="float: left;">
        <div style="float: left;width: 50px;margin-left: 5px;font-size: 18px;margin-top: 3px;height: 35px;line-height: 35px;">Email:</div>
        <input class="email" type="text" v-model="personEmail" @blur="setEmail">
      </div>
      <div class="follow-container">
        <a href="#/followcenter?act=user">
          <div style="color: #666;">关注数</div>
          <div class="subscriber">{{subscriber}}</div>
        </a>
        <a href="#/followcenter?act=fans">
          <div style="color: #666;">粉丝数</div>
          <div class="fans">{{fans}}</div>
        </a>
      </div>
      <el-button type="text" style="display: none;" id="uploadAvatar" @click="dialogVisible = true"></el-button>
      <el-dialog
        title="设置你的头像"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <div class="cropperWrapper">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :full="option.full"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :centerBox="true"
            :canMove="true"
            :fixedBox="true"
            :maxImgSize="1000"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div style="margin-left:20px;">
          <div class="show-preview" :style="{
        'width': '250px', 'height':'250px',  'overflow': 'hidden'}">
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
        <label for="uploads" icon="el-icon-edit" style="margin-top: 5px;" class="btn">选择图片</label>
        <input type="file" id="uploads" :value="imgFile" style="clip:rect(0 0 0 0);display: none;" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="finish('blob')">确 定</el-button>
        </span>
      </el-dialog>
    </section>
    <section class="container">
      <ul class="select">
        <li :class="{active:active==0}" @click="getLikeData">喜欢</li>
        <li :class="{active:active==1}" @click="getCollectData">收藏</li>
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
import { VueCropper } from 'vue-cropper';
import PhotoWalls from '../PhotoWalls/PhotoWalls.vue';
import Shadow from '../Shadow/Shadow.vue';
import Foot from '../Foot/Foot.vue';

const PATH = '/static/upload/';
export default {
  name: 'PersonCenter',
  data () {
    return {
      headImg: '',
      imgFile: '',
      option: {
        img: 'static/img/defaultAvatar.jpg',
        size: 1,
        full: false,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150
      },
      previews: {
      },
      dialogVisible: false,
      active: 0,
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
      subscriber: 0,
      fans: 0
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
    //  上传图片（点击上传按钮）
    finish (type) {
      console.log('finish');
      this.dialogVisible = false;
      let _this = this;
      let formData = new FormData();
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          formData.append('file', data, this.fileName);
          formData.append('act', 'avatar');

          this.$http.post('/api/alterUserInfo', formData)
            .then((response) => {
              var res = response.data;
              console.log(res);
              if (parseInt(res.status) === 0) {
                _this.imgFile = '';
                /* _this.headImg = res.realPathList[0];  //完整路径
                _this.uploadImgRelaPath = res.relaPathList[0];  //非完整路径 */
                _this.avatar = res.avatar;
                _this.$message({//  element-ui的消息Message消息提示组件
                  type: 'success',
                  message: '上传成功'
                });
              }
            });
        });
      }
    },
    setUserName () {
      let othis = this;
      this.$http.post('/api/alterUserInfo', {act: 'username', username: othis.personUser}).then((res) => {
        let data = res.data;
        let status = data.status;
        if (parseInt(status) === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          this.$message.error('修改失败');
        }
      });
    },
    setEmail () {
      let othis = this;
      this.$http.post('/api/alterUserInfo', {act: 'email', email: othis.personEmail}).then((res) => {
        let data = res.data;
        let status = data.status;
        if (parseInt(status) === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          this.$message.error('修改失败');
        }
      });
    },
    uploadImg (e, num) {
      console.log('uploadImg');
      var _this = this;
      //  上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    realTime (data) {
      this.previews = data;
    },
    handleClose (done) {
      done();
    },
    showShadow () {
      // console.log(this.personal);
      this.$refs.shadow.ifshow = true;
    },
    checkUser () {
      this.$http.post('/api/login', {'act': 'getLoginUser'}).then((res) => {
        let data = res.data;
        let userId = parseInt(this.userId);
        if (userId === -1) {
          this.$router.replace({path: '/main'});
          return;
        }
        this.personUser = data.username;
        this.personEmail = data.email;
        this.avatar = data.avatar;
        this.initData();
      });
    },
    initData () {
      let othis = this;
      this.$http.post('/api/getLike', {userId: this.userId}).then((res) => {
        let data = res.data;
        this.freshPersonalData(data);
      });
      this.$http.post('/api/getFans', {act: 'user', userID: othis.userId}).then((res) => {
        let data = res.data;
        if (data.length >= 0) {
          othis.subscriber = data.length;
        }
      });
      this.$http.post('/api/getFans', {act: 'fans', userID: othis.userId}).then((res) => {
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
  activated () {
    this.checkUser();
  },
  deactivated () {
    this.$destroy(true);
  },
  components: {
    PhotoWalls,
    Shadow,
    Foot,
    VueCropper
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .top
    text-align: center;
  .left
    float: left;
    width: 60px;
  .right
    float: right;
    width: 60px;
  .bottom
    clear: both;
    text-align: center;
  .item
    margin: 4px;
  .left .el-tooltip__popper,
  .right .el-tooltip__popper
    padding: 8px 10px;
  .personcenter
    margin-top 100px
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
    .cropperWrapper
      width 50%
      height 250px
      float left
    .show-preview
      padding-left: 30px
      .preview
        overflow hidden
        border-radius 50%
        border 1px solid #cccccc
        background #cccccc
    .imgContent
      margin-bottom 150px;
    .head
      width 150px
      height 150px
      border-radius 75px
      background #666
      background-size cover
      float left
      margin-left calc(50% - 190px)
      margin-right 30px
      cursor pointer
    .name
      font-size 36px
      font-weight bold
      margin-top 25px
      display block
      float left
      width 300px
      border-radius 3%
      transition .5s
      border 2px solid #fff
      text-indent 5px
      &:hover
        border 2px solid #0f0f0f
    .email
      font-size 18px
      display block
      float: left
      width 250px
      height 35px
      margin-top 3px
      border-radius 3%
      transition .5s
      border 2px solid #fff
      text-indent 5px
      &:hover
        border 2px solid #0f0f0f
    .select
      margin 50px 0
      height 20px
      li
        float left
        font-size 20px
        margin-right 10px
        cursor pointer
        &.active
          color #2177C7
</style>
