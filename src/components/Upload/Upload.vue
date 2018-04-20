<template>
  <div class="upload">
    <div class="container" ref="upload">
      <h1>Submit a photo</h1>
      <p>我们将会审核你的图片，在两个工作日之内给你回复，同时感谢你的提交，因为没有提交也就没有我们。</p>
      <p>如果你的作品被出版，我们将会将你的名字记录到我们的网站中，感谢你的分享！</p>
      <h2>虽然你有自己的权利，但是请只提交图片！</h2>
      <label for="upPhoto" class="upPhoto">上传你的图片</label>
      <p style="color: red;margin-top: 5px;">{{imgInfo}}</p>
      <input type="file" id="upPhoto" @change="alterInfo" style="display: none;" ref="file">
      <p style="margin-top: 15px;">选择你的类别标签</p>
      <p>请认真对待，这关系到是否通过审核:)</p>
      <div class="selectType">
        <label v-for="(item,index) in tags" :key="index">
          <input type="radio" name="types" style="display: none;" :checked="index===radioNum" @click="checkID=item.ID">
          <span>{{item.typename}}</span>
        </label>
      </div>
      <div class="submitBtn" @click="upload">提交</div>
    </div>
    <div class="foot">
      <Foot :styleType="1"></Foot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Foot from '../../components/Foot/Foot.vue';
export default {
  name: 'Upload',
  data () {
    return {
      imgInfo: '',
      tags: [],
      checkID: 1,
      fileObj: null,
      test: null,
      radioNum: 0
    };
  },
  components: {
    Foot
  },
  methods: {
    getTags () {
      this.$http.post('/api/getTypes').then((res) => {
        let data = res.data;
        this.tags = data;
        this.checkID = this.tags.ID;
        console.log(this.tags);
      });
    },
    checkUser () {
      this.$http.post('/api/login', {'act': 'getLoginUser'}).then((res) => {
        let data = res.data;
        let userId = data.user_id;
        if (!userId) {
          this.$router.replace({path: '/main'});
        }
      });
    },
    upload () {
      const formData = new FormData();
      formData.append('file', this.fileObj);
      formData.append('imgType', this.checkID);
      if (this.imgInfo === '') {
        alert('请选择需要提交的图片');
        return;
      }
      let check = confirm(`你确定要提交：类型为"${this.tags[this.checkIndex].typename}"，路径为"${this.imgInfo}"的图片吗？`);
      if (!check) return;
      this.$http.post('/api/imgupload', formData).then((res) => {
        let data = res.data;
        if (parseInt(data.status) === 0) {
          alert(data.info);
        }
        console.log(data);
      });
    },
    alterInfo (event) {
      let file = event.target.files[0];
      this.imgInfo = this.$refs.file.value;
      this.fileObj = file;
      this.checkID = this.tags[0].ID;
    }
  },
  computed: {
    checkIndex () {
      for (let i = 0; i < this.tags.length; i++) {
        let item = this.tags[i];
        if (item.ID === this.checkID) return i;
      }
    }
  },
  activated () {
    this.checkUser();
  },
  mounted () {
    this.getTags();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .upload
    background #fff
    .container
      margin-top 50px
      h1
        font-size 50px
        font-weight bold
        text-align center
        margin-top 50px
      p
        text-align center
        font-size 16px
      h2
        font-size 14px
        text-align center
      .submitBtn
        width 120px
        height 40px
        background black
        text-align center
        line-height 40px
        font-size 13px
        color #fff
        border-radius 6px
        cursor pointer
        margin-left calc(50% - 60px)
        margin-top 10px
      .upPhoto
        width 120px
        height 45px
        background black
        text-align center
        line-height 45px
        font-size 13px
        color #fff
        border-radius 6px
        cursor pointer
        margin-left calc(50% - 60px)
        margin-top 30px
      .selectType
        overflow: hidden
        label
          display block
          float left
          width 100px
          height 40px
          margin-left 10px
          input:checked+span
            background #000
            color #fff
          span
            display block
            width 100%
            height 100%
            background #fff
            text-align center
            line-height 36px
            font-size 13px
            color #000
            border 2px solid black
            box-sizing border-box
            border-radius 8px
            margin-left 5px
            cursor pointer
            transition 0.5s
    .foot
      width 100%
      margin-top 250px
</style>
