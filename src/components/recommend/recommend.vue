<template>
  <div class="box">
    <swiper @totatoil="totatoil"></swiper>
    <div class="title">歌单推荐({{ recommend.total }})</div>
    <el-divider></el-divider>
    <router-view></router-view>
    <div class="playList">
      <div
        class="recommend-list"
        v-for="(item, index) in recommend.playlists"
        :key="index"
        @mouseover="show(index)"
      >
        <img :src="item.coverImgUrl" />
        <div class="palylist-tit">{{ item.copywriter }}</div>
        <div class="play-volume">
          <span>播放量</span><span>{{ item.playCount }}</span>
        </div>
        <i
          class="el-icon-video-play"
          :class="active == index ? 'active' : 'isactive'"
          @click="play(index)"
        ></i>
      </div>
      <!-- <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination> -->
    </div>
  </div>
</template>
<script>
import swiper from "../../components/swiper/swiper.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    swiper,
  },
  data() {
    return {
      playlist: [],
      ClickPlaylist: [],
      singername: [],
      banner: [],
      n: 10,
      active: 0,
    };
  },
  computed: {
    ...mapActions(["getrecommend"]),
    ...mapState(["recommend"]),
  },
  methods: {
    totatoil() {
      console.log("轮播图。。。");
    },
    show(index) {
      this.active = index;
    },
    play(index) {
      this.$router.push({
        path: "/songdetails",
        query: {
          index: index,
        },
      });
    },
  },
  mounted() {
    this.getrecommend;
  },
};
</script>
<style scoped>
.box {
  width: 100%;
}
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.playList {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
}
.recommend-list {
  height: 283px;
  width: 224px;
  font-size: 12px;
  margin: 10px;
}
.recommend-list img {
  width: 100%;
  height: 85%;
}
.recommend-list .palylist-tit {
  margin: 5px 0;
  color: #000000;
}
.recommend-list .play-volume {
  color: #999999;
}
.recommend-list i {
  color: #ffffff;
  position: relative;
  top: -160px;
  left: 50%;
  transform: translate(50%, -50%) scale(6);
}
.isactive {
  display: none;
}
.active {
  display: inline-block;
}
.recommend-list .play-volume span:nth-child(1) {
  margin: 0 5px 0 0;
}
</style>
