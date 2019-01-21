<template>
  <div class="cmt-container">
    <h3>发送评论</h3>
    <hr>
    <textarea v-model="msg" placeholder="请输入要输入的内容(最多输入120字哦)" maxlength="120"></textarea>
    <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div v-for="(item,index) in comments" :key="item.add_time" class="cmt-item">
        <div class="cmt-title">第{{index+1}}层 用户:{{item.user_name}} 发表时间:{{item.add_time|Date}}</div>
        <div class="cmt-body">{{item.content === 'undefined'?'此用户很懒,毛都没写':item.content}}</div>
      </div>
    </div>
    <mt-button @click="getMore" type="danger" plain size="large">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "", //评论的内容
      pageIndex: 1,
      comments: []
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      //获取评论数据渲染页面
      const { data: res } = await this.$http.get(
        "/api/getcomments/" + this.id + "?pageindex=" + this.pageIndex
      );
      if (res.status === 0) {
        //为了完成加载更多，获得新数据后要进行拼接而不是覆盖
        this.comments = this.comments.concat(res.message);
      } else {
        Toast("加载失败了~");
      }
    },
    getMore() {
      //加载更多
      this.pageIndex++;
      this.getComments();
    },
    async postComment() {
      if (this.msg.trim().length == 0) {
        return Toast("评论的内容不能为空!");
      } else {
        //发表评论,需要提交给服务器的数据对象
        const { data: res } = await this.$http.post(
          "/api/postcomment/" + this.id,
          { content: this.msg.trim() }
        );
        if (res.status === 0) {
            const cmt = {
                user_name:"匿名用户",
                add_time:Date.now(),
                content:this.msg.trim()
            }
            this.comments.unshift(cmt)
            this.msg=""
        }
      }
    }
  },
  props: ["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h4 {
    font-size: 18px;
  }
  textarea {
    font-size: 16px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 6px;
    .cmt-item {
      .cmt-title {
        font-size: 14px;
        line-height: 30px;
        background-color: #cccccc;
      }
      .cmt-body {
        font-size: 16px;
        text-indent: 2em;
        line-height: 30px;
      }
    }
  }
}
</style>

