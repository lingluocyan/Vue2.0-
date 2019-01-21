<template>
  <div class="newsinfo-container">
      <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:{{newsinfo.addtime|Date}}</span>
      <span>点击:{{newsinfo.click}}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区域 -->
    <comment :id="this.id"></comment>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      //拿到URL中的id，对应的路由要设置:id这种格式
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    async getNewsInfo() {
      //获取新闻详情
      const { data: res } = await this.$http.get("/api/getnew/" + this.id);
      if (res.status === 0) {
        this.newsinfo = res.message[0];
      } else {
        Toast("加载失败啦~");
      }
    }
  },
  components:{
      comment
  }
};
</script>
<style lang="scss">
.newsinfo-container {
  padding: 0 6px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: purple;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>

