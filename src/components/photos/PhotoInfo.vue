<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time|Date}}</span>
      <span>点击次数:{{photoinfo.click}}次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <div class="thumbs">
        <!-- :src="item.src" -->
        <!-- @click="$preview.open(index, list)" -->
        <!-- :src="item.src" -->
      <img
        src="https://konachan.net/data/preview/c5/9c/c59ca6ab7400112084741d42d6de8e42.jpg"
        :key="item.src"
        class="preview-img"
        v-for="(item) in list"
        height="100"
      >
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论区域(引用子组件) -->
    <comment :id="this.id"></comment>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {}, //图片详情
      list: [] //缩略图所在数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    async getPhotoInfo() {
      // 获取图片详情
      const { data: res } = await this.$http.get(
        "/api/getimageInfo/" + this.id
      );
      if (res.status === 0) {
        this.photoinfo = res.message[0];
      }
    },
    async getThumbs() {
      //获取缩略图
    //   let res = [
    //     {
    //       src:"https://konachan.net/data/preview/c5/9c/c59ca6ab7400112084741d42d6de8e42.jpg",
    //     },
    //     {
    //       src:"https://konachan.net/data/preview/d0/99/d099f5f90fa05ca8b484734ece26cd97.jpg"
    //     }
    //   ];
    //   res.forEach(item => {
    //     item.w = 600;
    //     item.h = 400;
    //   });
    //   this.list = res;
    //   console.log(this.list);
        const { data: res } = await this.$http.get(
          "/api/getthumimages/" + this.id
        );
        if (res.status === 0) {
          //循环遍历补全图片宽高
          res.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.list = res.message;
        }
    }
  },
  components: {
    comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 5px;
  h3 {
    color: purple;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .content {
    font-size: 14px;
  }
  .thumbs {
    img {
      margin: 2px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
