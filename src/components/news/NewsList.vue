<template>
  <div>
    <ul class="mui-table-view">
      <li v-for="item in newslist" :key="item.id" class="mui-table-view-cell mui-media">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img
            class="mui-media-object mui-pull-left"
            src="https://i2.hdslb.com/bfs/archive/11286c7d32b755ba70bdd198fd816bd79f6d15ab.jpg@160w_100h.webp"
          >
          <h1>{{item.title}}</h1>
          <p class="mui-ellipsis">
            <span>发表时间:{{item.add_time|Date}}</span>
            <span>点击:{{item.click}}次</span>
          </p>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img
            class="mui-media-object mui-pull-left"
            src="https://i2.hdslb.com/bfs/archive/11286c7d32b755ba70bdd198fd816bd79f6d15ab.jpg@160w_100h.webp"
          >
          <h1>幸福</h1>
          <p class="mui-ellipsis">
            <span>发表时间:2012-12-12</span>
            <span>点击:0次</span>
          </p>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img
            class="mui-media-object mui-pull-left"
            src="https://i2.hdslb.com/bfs/archive/11286c7d32b755ba70bdd198fd816bd79f6d15ab.jpg@160w_100h.webp"
          >
          <h1>幸福</h1>
          <p class="mui-ellipsis">
            <span>发表时间:2012-12-12</span>
            <span>点击:0次</span>
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
        newslist:[]//新闻列表
    };
  },
  created() {
      this.getNewsList()
  },
  methods: {
    //获取新闻列表
    async getNewsList() {
      const { data: res } = await this.$http.get("/api/getnewslist");
      if (res.status === 0) {
        this.newslist = res.message;
      } else {
        Toast("加载失败了~");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 16px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: rgb(82, 187, 187);
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
