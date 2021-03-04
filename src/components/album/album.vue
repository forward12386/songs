<template>
  <div>
    <div class="wrap">
      <div class="leftbox">
        <div class="cover">
          <img :src="album.artist.picUrl" class="CoverImg" />
          <div class="covertit">
            <h2>{{ album.name }}</h2>
            <p>歌手：{{ album.artist.name }}</p>
            <p v-if="album.company != ''">所属唱片：{{ album.company }}</p>
            <p>发行时间：{{ publishTime }}</p>
          </div>
        </div>
        <div class="list">
          <div class="header">
            <span>歌曲列表</span>
            <span class="count">共 {{ album.size }}首歌</span>
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
                v-for="(item, index) of alSongs"
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
                <td :title="item.al.name" class="album">
                  <div>{{ item.al.name }}</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div style="clear:both "></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alSongs: [],
      album: [],
      publishTime: [],
    };
  },
  methods: {
    play(index) {
      console.log(index);
      this.$router.push({
        path: "/lyric",
        query: {
          id: this.alSongs[index].id,
        },
      });
    },
    playmv(index) {
      this.$router.push({
        path: "/playMv",
        query: {
          id: this.alSongs[index].mv,
        },
      });
    },
    tosinger(index, s) {
      this.$router.push({
        path: "/singer",
        query: {
          singerid: this.alSongs[index].ar[s].id,
        },
      });
    },
  },
  mounted() {
    let that = this;
    let alId = that.$route.query.id;
    that.$axios
      .get("http://localhost:3000/album?id=" + alId)
      .then((res) => {
        that.alSongs = res.data.songs;
        that.album = res.data.album;
        let date1 = new Date(that.album.publishTime);
        let year1 = date1.getFullYear() + "-";
        let month1 =
          (date1.getMonth() + 1 < 10
            ? "0" + (date1.getMonth() + 1)
            : date1.getMonth() + 1) + "-";
        let dates1 = date1.getDate() + " ";
        let hour1 = date1.getHours() + ":";
        let minutes = date1.getMinutes() + ":";
        let seconds = date1.getSeconds();
        that.publishTime = year1 + month1 + dates1;
      })
      .catch((err) => {
        console.log(err);
      });
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
.leftbox .leftbox .list {
  display: block;
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
</style>
