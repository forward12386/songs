<template>
  <div>
    <div class="max-warp">
      <div class="left">
        <div class="artistname">
          <h2>{{ songslist.name }}</h2>
          <span>{{ songslist.trans }}</span>
        </div>

        <div class="artistimg">
          <img :src="songslist.picUrl" alt="" />
        </div>
        <el-tabs
          type="card"
          @tab-click="handleClick"
          style="width:640px;color:#000"
        >
          <el-tab-pane label="热门单曲">
            <table border="0" class="songslists">
              <thead>
                <td></td>
                <td>歌曲名</td>
                <td>歌手</td>
                <td>专辑</td>
              </thead>
              <tr
                v-for="(item, index) in songs.hotSongs"
                :key="index"
                class="list"
              >
                <td>
                  <div>{{ index + 1 }}</div>
                </td>
                <td>
                  <div :title="item.name" @click="Psong(index)">
                    {{ item.name }}
                  </div>
                  <i
                    class="el-icon-video-camera"
                    v-if="item.mv > 0"
                    title="播放此MV"
                    @click="playMv(index)"
                  ></i>
                </td>
                <td>
                  <div class="singer">
                    <div
                      v-for="(i, indexs) in item.ar"
                      :key="indexs"
                      :title="i.name"
                    >
                      {{ i.name }}
                    </div>
                  </div>
                </td>
                <td class="album">
                  <div :title="item.al.name">{{ item.al.name }}</div>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="所有专辑">
            <div class="al-list">
              <div
                class="al"
                v-for="(item, index) in album.hotAlbums"
                :key="index"
              >
                <img :src="item.picUrl" alt="" @click="toAl(index)" />
                <div class="alname" :title="item.name" @click="toAl(index)">
                  {{ item.name }}
                </div>
                <div class="altime">{{ ptime[index] }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="相关MV">
            <div class="mv">
              <div class="list">
                <div v-for="(item, index) in smv" :key="index" class="mvlist">
                  <img :src="item.imgurl" alt="" @click="playMv2(index)" />
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="艺人介绍">
            <div>
              <!-- <div>{{ songslist.name }}的简介</div> -->
              <p>{{ decs.briefDesc }}</p>
              <div v-for="(item, index) in decs.introduction" :key="index">
                <p>{{ item.ti }}</p>
                <p>{{ item.txt }}</p>
              </div>
            </div>
            <!-- <div v-else>
              <p>暂无信息</p>
            </div> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.singerid,
      songs: [],
      songslist: [],
      decs: [],
      album: [],
      altime: [],
      ptime: [],
      smv: [],
    };
  },
  methods: {
    handleClick() {
      console.log(1);
    },
    Psong(index) {
      this.$router.push({
        path: "/lyric",
        query: {
          id: this.songs.hotSongs[index].id,
        },
      });
    },
    playMv(index) {
      this.$router.push({
        path: "/playMv",
        query: {
          id: this.songs.hotSongs[index].mv,
        },
      });
    },
    playMv2(index) {
      this.$router.push({
        path: "/playMv",
        query: {
          id: this.smv[index].id,
        },
      });
    },
    toAl(index) {
      this.$router.push({
        path: "/album",
        query: {
          id: this.altime[index].id,
        },
      });
    },
  },
  mounted() {
    this.$axios
      .get("http://localhost:3000/artists?id=" + this.id)
      .then((res) => {
        this.songslist = res.data.artist;
        this.songs = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("http://localhost:3000/artist/desc?id=" + this.id)
      .then((res) => {
        this.decs = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get("http://localhost:3000/artist/album?id=" + this.id)
      .then((res) => {
        this.album = res.data;
        this.altime = res.data.hotAlbums;
        for (let i = 0; i < this.altime.length; i++) {
          const date = new Date(this.altime[i].publishTime);
          const year = date.getFullYear() + "-";
          const month =
            (date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) + "-";
          const dates = date.getDate() + " ";
          const hour = date.getHours() + ":";
          let times = [];
          times = year + month + dates;
          this.ptime.push(times);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get("http://localhost:3000/artist/mv?id=" + this.id)
      .then((res) => {
        this.smv = res.data.mvs;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.body {
  background-color: #fff;
}
.max-warp {
  width: 700px;
  background-color: #f5f5f5;
  margin: 0 auto;
  display: flex;
}
.max-warp .left {
  width: 700px;
  padding: 20px;
}
.max-warp .left .artistname {
  margin: 0;
  padding: 0;
  display: flex;
  align-self: center;
  height: 27px;
}
.max-warp .left .artistname h2 {
  font-weight: 400;
  margin: 0;
  padding: 0;
}
.max-warp .left .artistname span {
  color: #666;
  font-size: 13px;
  margin: 0 10px;
  line-height: 27px;
}
.max-warp .left .artistimg {
  width: 640px;
  height: 300px;
}
.max-warp .left .artistimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.max-warp .left table {
  width: 640px;
  table-layout: fixed;
  font-size: 12px;
  border: 1px solid #666;
  border-top: 2px solid #ff0000;
  text-align: center;
}
.max-warp .left .songslists thead td {
  text-align: left;
  height: 30px;
  line-height: 30px;
}
.max-warp .left .songslists .list {
  cursor: pointer;
}
.max-warp .left .songslists tr {
  height: 32px;
}
.max-warp .left .songslists tr td {
  height: 35px;
}
.max-warp .left .songslists thead td:nth-child(1) {
  width: 5%;
}
.max-warp .left .songslists thead td:nth-child(2) {
  width: 35%;
}
.max-warp .left .songslists thead td:nth-child(3) {
  width: 30%;
}
.max-warp .left .songslists thead td:nth-child(4) {
  width: 30%;
}

.max-warp .left .songslists tr td:nth-child(2) {
  display: flex;
  justify-content: start;
  height: 35px;
  line-height: 35px;
  overflow: hidden;
}
.max-warp .left .songslists tr td:nth-child(2) div {
  height: 35px;
  overflow: hidden;
  margin: 0 5px;
}
.max-warp .left .songslists tr td:nth-child(2) i {
  display: inline-block;
  height: 35px;
  line-height: 35px;
}
.max-warp .left .songslists tr td:nth-child(3) {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
}
.max-warp .left .songslists tr td:nth-child(3) .singer {
  width: 249px;
  height: 35px;
  line-height: 35px;
  display: flex;
  text-align: left;
  justify-content: start;
}
.max-warp .left .songslists tr td:nth-child(3) .singer div {
  margin: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.max-warp .left .songslists tr td:nth-child(4) {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.max-warp .left .songslists tr td:nth-child(4) div {
  text-align: left;
  height: 35px;
  line-height: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.max-warp .left .songslists tr:nth-child(2n + 1) {
  background-color: #f7f7f7;
}
.max-warp .left .songslists tr:nth-child(2n) {
  background-color: #ffffff;
}
.max-warp .left .al-list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  overflow: hidden;
}
.max-warp .left .al-list .al {
  width: 150px;
}
.max-warp .left .al-list .al img {
  height: 140px;
  width: 120px;
}
.max-warp .left .al-list .al .alname {
  color: #000000;
  font-size: 14px;
  width: 120px;
  max-height: 38px;
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.max-warp .left .al-list .al .altime {
  color: #666;
  margin-bottom: 50px;
  font-size: 12px;
  width: 120px;
  height: 20px;
  overflow: hidden;
}
.max-warp .left .mv {
  width: 100%;
}
.max-warp .left .mv .list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.max-warp .left .mv .mvlist {
  width: 200px;
  margin: 0 2px;
}
.max-warp .left .mv img {
  width: 200px;
  height: 200px;
}
.max-warp .left .mv p {
  font-size: 12px;
  width: 200px;
  height: 15px;
  line-height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
