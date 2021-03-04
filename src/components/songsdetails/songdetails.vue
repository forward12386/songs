<template>
  <div>
    <div class="wrap">
      <div class="leftbox">
        <div class="cover">
          <img :src="detail.coverImgUrl" class="CoverImg" />
          <div class="covertit">
            <h2>{{ detail.name }}</h2>
            <div class="creator">
              <img :src="detail.creator.avatarUrl" />
              <div class="creatorname">{{ detail.creator.nickname }}</div>
              <div class="creatortime">
                {{ createdate }}
                <span>创建</span>
              </div>
            </div>
            <div class="tag">
              <b>标签:</b>
              <i v-for="(item, index) in detail.tags" :key="index">
                {{ item }}
              </i>
            </div>
            <div class="playCount">
              <span>播放量:</span>
              <span>{{ detail.playCount }}</span>
            </div>
            <div class="playCount">
              <span>订阅量:</span>
              <span>{{ detail.subscribedCount }}</span>
            </div>
            <div class="introduction">
              <span>介绍:</span>
              <span>{{ detail.creator.signature }}</span>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="header">
            <span>歌曲列表</span>
            <span class="count">共 {{ result.length }}首歌</span>
          </div>
          <div class="songs">
            <table border="0">
              <thead>
                <td></td>
                <td>歌曲名</td>
                <td>歌手</td>
                <td>专辑</td>
              </thead>
              <tr
                class="songslist"
                v-for="(item, index) of result"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td
                  @click.stop="play(index)"
                  :title="item.name"
                  class="musicname"
                >
                  <div>{{ item.name }}</div>
                  <i
                    class="el-icon-video-camera"
                    v-if="item.mv > 0"
                    @click.stop="playmv(index)"
                  ></i>
                </td>
                <td class="singer">
                  <div class="ar">
                    <div v-for="(i, s) in item.ar" :key="s" :title="i.name">
                      <span @click="tosinger(index, s)">{{ i.name }}</span>
                    </div>
                  </div>
                </td>
                <td :title="item.al.name" class="album" @click="toAlbum(index)">
                  <div>{{ item.al.name }}</div>
                </td>
              </tr>
            </table>

            <div class="comment">
              <div class="comment-title">
                评论
                <span style="margin:0 10px;font-size:15px"
                  >共 {{ detail.commentCount }} 条评论</span
                >
              </div>
              <div class="post-a-comment">
                <img src="../../assets/img/default_avatar.jpg" alt="" />
                <div class="text-comment">
                  <textarea
                    name=""
                    id=""
                    cols="10"
                    rows="30"
                    placeholder="评论"
                  ></textarea>
                  <div class="commit-comment">发表</div>
                </div>
              </div>
              <div class="t-comment" v-show="hotcomments.length > 0">
                精彩评论
              </div>
              <div
                class="w-comments"
                v-for="(items, indexs) in hotcomments"
                :key="'c' + indexs"
                v-show="hotcomments.length > 0"
              >
                <img :src="items.user.avatarUrl" alt="" />
                <div>
                  <div class="comments">
                    <a href="javascipt:void(0)"> {{ items.user.nickname }} </a>
                    <span>：{{ items.content }}</span>
                    <div
                      class="reply"
                      v-for="(ii, inde) in items.beReplied"
                      :key="'ii' + inde"
                    >
                      <a href="javascipt:void(0)">{{ ii.user.nickname }}</a>
                      <span>：{{ ii.content }}</span>
                    </div>
                  </div>
                  <div class="comments-bottom">
                    <div class="comment-time">
                      {{ hotcommentstime[indexs] }}
                    </div>
                    <div class="zan">
                      <img src="../../assets/img/icon/zan.png" />
                      <i v-show="items.likedCount > 0"
                        >({{ items.likedCount }})</i
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="t-comment">最新评论</div>
              <div
                class="w-comments"
                v-for="(item, index) in comments"
                :key="index"
              >
                <img :src="item.user.avatarUrl" alt="" />
                <div>
                  <div class="comments">
                    <a href="javascipt:void(0)"> {{ item.user.nickname }} </a>
                    <span>：{{ item.content }}</span>
                    <div
                      class="reply"
                      v-for="(i, ind) in item.beReplied"
                      :key="ind"
                    >
                      <a href="javascipt:void(0)">{{ i.user.nickname }}</a>
                      <span>：{{ i.content }}</span>
                    </div>
                  </div>
                  <div class="comments-bottom">
                    <div class="comment-time">{{ commenttime[index] }}</div>
                    <div class="zan">
                      <img src="../../assets/img/icon/zan.png" />
                      <i v-show="item.likedCount > 0"
                        >({{ item.likedCount }})</i
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pagesize"
              :page-count="pagecount"
              hide-on-single-page
              :current-page.sync="currentpage"
              @current-change="currentChange()"
            >
            </el-pagination>
            <audio :src="music" controls autoplay></audio>
          </div>
        </div>
      </div>
      <div style="clear:both "></div>
    </div>
  </div>
</template>
<script>
import { Alert } from "element-ui";
import wyyhead from "../wyyhead/wyyhead.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    wyyhead,
  },
  data() {
    return {
      createdate: "", //歌单创建时间
      result: [],
      music: [],
      check: [],
      comments: [],
      hotcomments: [],
      commenttime: [],
      hotcommentstime: [],
      pagecount: 0,
      pagesize: 10,
      currentpage: 1,
    };
  },
  methods: {
    ...mapMutations(["getdetailByindex"]),
    currentChange() {
      let that = this;
      this.$axios
        .get(
          "http://localhost:3000/comment/playlist?id=" +
            that.$store.state.detail.id +
            "&limit=" +
            that.pagesize +
            "&offset=" +
            (parseInt(that.currentpage) - 1) * that.pagesize
        )
        .then((res) => {
          that.comments = res.data.comments;
        })
        .catch((err) => {
          console.log(err);
        });
      if (that.currentpage === 1) {
        this.$axios
          .get(
            "http://localhost:3000/comment/hot?id=" +
              that.$store.state.detail.id +
              "&type=2"
          )
          .then((res) => {
            that.hotcomments = res.data.hotComments;
            for (let i = 0; i < that.hotcomments.length; i++) {
              let date2 = new Date(that.hotcomments[i].time);
              let y = date2.getFullYear() + "-";
              let m =
                (date2.getMonth() + 1 < 10
                  ? "0" + (date2.getMonth() + 1)
                  : date2.getMonth() + 1) + "-";
              let dd = date2.getDate() + " ";
              let hh = date2.getHours() + ":";
              let mm = date2.getMinutes() + ":";
              let ss = date2.getSeconds();
              var t = [];
              t = y + m + dd + hh + mm + ss;
              that.hotcommentstime.push(t);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        that.hotcomments = [];
      }
    },
    //点击歌曲 获得条状到歌词页面
    play(index) {
      console.log(index);
      this.$router.push({
        path: "/lyric",
        query: {
          id: this.result[index].id,
        },
      });
    },
    playmv(index) {
      this.$router.push({
        path: "/playMv",
        query: {
          id: this.result[index].mv,
        },
      });
    },
    tosinger(index, s) {
      this.$router.push({
        path: "/singer",
        query: {
          singerid: this.result[index].ar[s].id,
        },
      });
    },
    toAlbum(index) {
      this.$router.push({
        path: "/album",
        query: {
          id: this.result[index].al.id,
        },
      });
    },
  },
  computed: {
    ...mapState(["recommend"]),
    ...mapState(["detail"]),
  },
  mounted() {
    let that = this;
    this.getdetailByindex(this.$route.query.index);
    //从推荐歌单传来的数据
    that.pagecount = parseInt(
      //
      that.$store.state.detail.commentCount / that.pagesize
    );
    that.creator = that.$store.state.detail.creator;

    this.$axios
      .get(
        "http://localhost:3000/playlist/detail?id=" +
          that.$store.state.detail.id
      )
      .then((res) => {
        let ids = res.data.playlist.trackIds;
        for (let i = 0; i < 50; i++) {
          this.$axios
            .get("http://localhost:3000/song/detail?ids=" + ids[i].id)
            .then((res) => {
              // console.log(res);
              that.result.push(res.data.songs[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //评论
    this.$axios
      .get(
        "http://localhost:3000/comment/playlist?id=" +
          that.$store.state.detail.id +
          "&limit=" +
          that.pagesize +
          "&offset=" +
          (1 - 1) * that.pagesize
      )
      .then((res) => {
        that.comments = res.data.comments;
        for (let i = 0; i < that.comments.length; i++) {
          let date1 = new Date(that.comments[i].time);
          let year1 = date1.getFullYear() + "-";
          let month1 =
            (date1.getMonth() + 1 < 10
              ? "0" + (date1.getMonth() + 1)
              : date1.getMonth() + 1) + "-";
          let dates1 = date1.getDate() + " ";
          let hour1 = date1.getHours() + ":";
          let minutes = date1.getMinutes() + ":";
          let seconds = date1.getSeconds();
          var times = [];
          times = year1 + month1 + dates1 + hour1 + minutes + seconds;
          that.commenttime.push(times);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get(
        "http://localhost:3000/comment/hot?id=" +
          that.$store.state.detail.id +
          "&type=2"
      )
      .then((res) => {
        that.hotcomments = res.data.hotComments;
        for (let i = 0; i < that.hotcomments.length; i++) {
          let date2 = new Date(that.hotcomments[i].time);
          let y = date2.getFullYear() + "-";
          let m =
            (date2.getMonth() + 1 < 10
              ? "0" + (date2.getMonth() + 1)
              : date2.getMonth() + 1) + "-";
          let dd = date2.getDate() + " ";
          let hh = date2.getHours() + ":";
          let mm = date2.getMinutes() + ":";
          let ss = date2.getSeconds();
          var t = [];
          t = y + m + dd + hh + mm + ss;
          that.hotcommentstime.push(t);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const date = new Date(that.$store.state.detail.createTime);
    const year = date.getFullYear() + "-";
    const month =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    const dates = date.getDate() + " ";
    const hour = date.getHours() + ":";
    that.createdate = year + month + dates;
  },
};
</script>
<style scoped>
body {
  background: #f5f5f5;
}
.wrap {
  width: 940px;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
}
.leftbox {
  float: left;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  overflow: hidden;
}
.leftbox .cover {
  width: 900px;
  height: 230px;
  display: flex;
  justify-content: start;
}
.leftbox .CoverImg {
  width: 208px;
  height: 208px;
}
.leftbox .covertit {
  margin-left: 20px;
}
.leftbox .covertit h2 {
  font-size: 16px;
}
.leftbox .covertit .creator {
  display: flex;
  justify-content: start;
  align-items: center;
}
.leftbox .covertit .creator img {
  width: 32px;
  height: 32px;
  font-size: 12px;
}
.leftbox .covertit .creator .creatorname {
  color: #0c73c2;
  font-size: 12px;
  padding: 0 2px;
}
.leftbox .covertit .creator .creatortime {
  font-size: 12px;
  margin-left: 2px;
  padding: 0 2px;
}
.leftbox .covertit .tag {
  color: #666;
}
.leftbox .covertit .tag b {
  font-weight: 400;
  font-size: 15px;
}
.leftbox .covertit .tag i {
  margin-left: 5px;
  padding: 5px;
  font-size: 15px;
  display: inline-block;
  text-align: center;
  line-height: 15px;
  height: 15px;
}
.leftbox .covertit .playCount {
  color: #666;
  font-size: 15px;
}
.leftbox .covertit .playCount span {
  padding: 2px;
}
.leftbox .covertit .introduction {
  color: #666;
  font-size: 15px;
}
.leftbox .covertit div {
  margin: 13px 0;
}
.leftbox .list .header {
  height: 33px;
  font-size: 22px;
}
.leftbox .list .header .count {
  font-size: 18px;
  padding: 0 10px;
}
.leftbox .list .songs table {
  table-layout: fixed;
  color: #8e8e8e;
  width: 900px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #f6f6f6;
  border-top: 2px solid #ff0000;
  padding: 10px;
}
.leftbox .list .songs table thead {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #eee;
  font-size: 15px;
  color: #000;
}
.leftbox .list .songs table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 5px;
  height: 30px;
}
.leftbox .list .songs table td:nth-child(1) {
  width: 50px;
}
.leftbox .list .songs table td:nth-child(2) {
  width: 150px;
}
.leftbox .list .songs table .musicname {
  display: flex;
  justify-content: start;
  align-items: center;
  align-content: center;
}
.leftbox .list .songs table .musicname div {
  width: 95%;
  height: 100%;
  line-height: 30px;
  margin-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leftbox .list .songs table td:nth-child(3) {
  width: 100px;
  height: 30px;
  line-height: 30px;
}
.leftbox .list .songs table .singer .ar {
  display: flex;
  width: 100px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leftbox .list .songs table .singer .ar div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 2px;
}
.leftbox .list .songs table td:nth-child(4) {
  width: 250px;
}
.leftbox .list .songs table .album div {
  width: 95%;
}

.leftbox .list .songs table .songslist td:hover {
  cursor: pointer;
  color: #0c73c2;
}
.leftbox .comment .comment-title {
  width: 900px;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  border-bottom: 2px solid #ff0000;
}
.leftbox .comment .post-a-comment {
  height: 90px;
  width: 900px;
  display: flex;
  justify-content: start;
}
.leftbox .comment .post-a-comment img {
  height: 50px;
  width: 50px;
  margin: 0 5px;
}
.leftbox .comment .post-a-comment .text-comment textarea {
  width: 830px;
  height: 50px;
  border: 1px solid #eeeeee;
  overflow-x: visible;
  overflow-y: visible;
  resize: none;
}
.leftbox .comment .post-a-comment .text-comment textarea::placeholder {
  color: #666;
  font-size: 15px;
}
.leftbox .comment .post-a-comment .text-comment textarea:focus {
  outline: none;
}
.leftbox .comment .post-a-comment .text-comment .commit-comment {
  width: 45px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #2d7dca;
  color: #fff;
  font-size: 15px;
  float: right;
  margin: 2px 5px;
}
.leftbox .comment .t-comment {
  font-size: 16px;
  width: 900px;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  border-bottom: 1px solid #666;
}
.leftbox .comment .w-comments {
  width: 900px;
  margin: 20px 0;
  display: flex;
  justify-content: start;
  font-size: 12px;
}
.leftbox .comment .w-comments img {
  height: 50px;
  width: 50px;
  margin-right: 10px;
}
.leftbox .comment .w-comments .comments a {
  font-size: 12px;
  font-weight: 400;
  color: #0c73c2;
  text-decoration: none;
}
.leftbox .comment .w-comments .reply {
  margin-top: 10px;
  padding: 10px;
  width: 820px;
  border: 1px solid #eee;
  background: #f4f4f4;
}
.leftbox .comment .w-comments .comments span {
  font-size: 12px;
}
.leftbox .comment .w-comments .comments-bottom {
  margin-top: 15px;
  width: 840px;
  display: flex;
  justify-content: space-between;
}
.leftbox .comment .w-comments .comments-bottom .zan {
  font-size: 12px;
}
.leftbox .comment .w-comments .comments-bottom .zan img {
  width: 15px;
  height: 15px;
  margin: 0;
}
.leftbox .comment .w-comments .comments-bottom .comment-time {
  color: #666;
  font-size: 12px;
}
audio {
  width: 80%;
}
</style>
