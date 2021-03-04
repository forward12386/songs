<template>
  <div>
    <swiper @totatoil="totatoil"></swiper>
    <div class="title">MV</div>
    <el-divider></el-divider>
    <div class="area">
      <ul>
        <li
          v-for="(item, index) in sort"
          :key="index"
          :class="active === index ? 'isactive' : ''"
          @click="sortMv(index)"
        >
          {{ item }}
        </li>
        <li @click="newMv" :class="active === 6 ? 'isactive' : ''">最新</li>
      </ul>
    </div>
    <div class="mv_wrap">
      <div class="mv_list" v-for="(item, index) in mv" :key="index">
        <img :src="item.cover" @click="playmv(index)" />
        <div class="mvname">{{ item.name }}</div>
        <div class="singername">
          {{ item.artists[0].name }}
        </div>
        <div class="date">
          <span>播放量</span>
          <span>{{ item.playCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert } from "element-ui";
import swiper from "../../components/swiper/swiper.vue";
export default {
  components: {
    swiper,
  },
  data() {
    return {
      sort: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
      mv: [],
      active: 0,
    };
  },
  methods: {
    totatoil() {
      console.log("轮播图。。。");
    },
    sortMv(index) {
      this.active = index;
      console.log(this.sort[index]);
      let that = this;
      this.$axios
        .get("http://localhost:3000/mv/all?area=" + this.sort[index])
        .then(function(res) {
          that.mv = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    newMv() {
      let that = this;
      this.active = 6;

      this.$axios
        .get("http://localhost:3000/mv/first?limit=30")
        .then(function(res) {
          that.mv = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    playmv(index) {
      this.$router.push({
        path: "/playMv",
        query: {
          id: this.mv[index].id,
        },
      });
    },
  },
  mounted() {
    let that = this;
    this.$axios
      .get("http://localhost:3000/mv/all?area=" + this.sort)
      .then(function(res) {
        that.mv = res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.area {
  width: 100%;
  height: 60px;
  background-color: #303133;
}
.area ul {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
}
.area ul li {
  list-style: none;
  margin: 0 20px;
  height: 100%;
  width: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.area ul li:hover {
  cursor: pointer;
}
.isactive {
  color: #ffffff;
}
.mv_wrap {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
.mv_list {
  width: 310px;
  height: 305px;
  margin: 12px;
  color: #a39b99;
}
.mv_list img {
  width: 100%;
  height: 75%;
}
.mv_list .mvname {
  color: #000000;
  margin: 10px 0 5px 0;
  width: 310px;
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mv_list .singername {
  margin-bottom: 5px;
}
.mv_list .date span {
  margin: 0 5px 0 0;
}
</style>
