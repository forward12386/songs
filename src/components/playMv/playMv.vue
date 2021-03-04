<template>
  <div>
    <div class="wrap">
      <div class="box">
        <span class="mvname">{{ mvInfo.name }}</span>
        <span
          class="mvar"
          v-for="(item, index) in mvInfo.artists"
          :key="index"
          >{{ item.name }}</span
        >
        <video
          id="media"
          :src="mvUrl"
          width="640px"
          height="360px"
          controls
          autoplay
        ></video>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mvUrl: "",
      mvid: "",
      mvInfo: [],
    };
  },
  methods: {},
  mounted() {
    let _this = this;
    _this.mvid = _this.$route.query.id;
    _this.$axios
      .get("http://localhost:3000/mv/url?id=" + _this.mvid)
      .then((res) => {
        _this.mvUrl = res.data.data.url;
      })
      .catch((err) => {
        console.log(err);
      });

    _this.$store.state.songurl = "";

    _this.$axios
      .get("http://localhost:3000/mv/detail?mvid=" + _this.mvid)
      .then((res) => {
        _this.mvInfo = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
.wrap {
  margin: 0 auto;
  width: 800px;
  border: 1px solid #e2e2e2;
}
.wrap .box {
  margin: 0 auto;
  width: 700px;
}
.wrap .mvname {
  font-size: 20px;
  display: inline-block;
  margin: 20px 5px 0 10px;
}
.wrap .mvar {
  font-size: 12px;
  color: blue;
  display: inline-block;
  margin: 20px 5px 0 10px;
}
.wrap .box video {
  margin: 15px 0;
}
</style>
