<template>
  <div>
    <swiper @totatoil="totatoil"></swiper>
    <div class="title">热门电台</div>
    <el-divider></el-divider>
    <div class="radiowrap">
      <div class="radiolist" v-for="(item, index) in radiolist" :key="index">
        <img :src="item.picUrl" alt="" srcset="" />
        <div class="radioname">{{ item.name }}</div>
        <div>
          <span>播放量 </span><span>{{ item.subCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../../components/swiper/swiper.vue";
export default {
  components: {
    swiper,
  },
  data() {
    return {
      radiolist: [],
    };
  },
  methods: {
    totatoil() {
      console.log("轮播图。。。");
    },
  },
  mounted() {
    let that = this;
    this.$axios
      .get("http://localhost:3000/dj/hot")
      .then((res) => {
        that.radiolist = res.data.djRadios;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.radiowrap {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin: 0 62px;
}
.radiolist {
  width: 223px;
  height: 282px;
  border: 1px solid #ff0000;
  margin: 10px;
}
.radiolist img {
  width: 100%;
  height: 85%;
}
.radiolist .radioname {
  width: 100%;
  height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
