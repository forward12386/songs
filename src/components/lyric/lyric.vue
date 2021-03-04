<template>
  <div>
    <div class="warp">
      <div class="leftimg">
        <div class="mimg">
          <img :src="songdetail[0].al.picUrl" alt="" />
        </div>
      </div>
      <div class="lyr">
        <em>{{ songdetail[0].name }}</em>
        <i
          v-if="songdetail[0].mv !== 0"
          class="el-icon-video-camera"
          @click="playMv()"
        ></i>
        <p class="lsinger" v-for="(item, index) in songdetail" :key="index">
          歌手：<span v-for="(items, i) in item.ar" :key="i"
            >{{ items.name }}
          </span>
        </p>
        <p class="lalbum">
          所属专辑：<span>{{ songdetail[0].al.name }}</span>
        </p>
        <div class="play">
          <button @click="playMusic">播放</button>
        </div>
        <div class="lyrs">
          <pre>{{ lyr }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      lyr: [],
      nolyr: "",
      songdetail: [],
      status: 0,
      songUrl: "",
    };
  },
  methods: {
    playMusic() {
      this.$axios
        .get("http://localhost:3000/check/music?id=" + this.id)
        .then((res) => {
          this.status = res.status;
          if (this.status == 200) {
            this.$axios
              .get("http://localhost:3000/song/url?id=" + this.id)
              .then((res) => {
                if (res.data.data[0].url !== null) {
                  this.songUrl = res.data.data[0].url;
                  this.$store.commit("getSongUrl", this.songUrl);
                } else {
                  alert("无法播放此曲");
                }
                // console.log(this.songUrl);
              })
              .catch((err) => {
                alert("无法播放此曲");
                console.log(err);
              });
          } else {
            console.log("无法播放此歌曲");
          }
        })
        .catch((err) => {
          alert("无法播放此歌曲");
          console.log(err);
        });
    },
    playMv() {
      this.$router.push({
        path: "/playMv",
        query: {
          id: this.songdetail[0].mv,
        },
      });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.$axios
      .get("http://localhost:3000/lyric?id=" + this.id)
      .then((res) => {
        if (res.data.nolyric !== true) {
          this.lyr = res.data.lrc.lyric;
        } else {
          this.lyr = "此歌曲为没有填词的纯音乐，请您欣赏";
        }
      })
      .catch((err) => {
        console.log(err);
        this.lyr = "暂无歌词";
      });
    this.$axios
      .get("http://localhost:3000/song/detail?ids=" + this.id)
      .then((res) => {
        this.songdetail = res.data.songs;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
.warp {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #666;
  display: flex;
}
.warp .leftimg {
  width: 200px;
  height: 100%;
  margin: 15px;
}
.leftimg .mimg {
  width: 200px;
  height: 205px;
  top: -4px;
  left: -4px;
  background: url("../../assets/img/sprite/coverall.png") -143px -580px
    no-repeat;
}
.leftimg .mimg img {
  width: 128px;
  height: 130px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
}
.warp .lyr {
  width: 600px;
  height: 100%;
  padding: 20px;
}
.warp .lyr em {
  font-style: normal;
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  font-size: 24px;
}
.warp .lyr i {
  font-style: normal;
  margin: 0 5px;
}
.warp .lyr .subtit {
  font-size: 14px;
  color: #bababa;
}
.warp .lyr .lsinger,
.lalbum {
  font-size: 14px;
  color: #666;
}
.warp .lyr .lsinger span {
  color: #0c73c2;
  cursor: pointer;
}
.warp .lyr .lalbum span {
  color: #0c73c2;
  cursor: pointer;
}
.warp .lyr .play button {
  border: none;
  outline: none;
  background-color: #0c73c2;
  color: #fff;
  cursor: pointer;
}
.warp .lyr .lyrs {
  width: 500px;
  margin: 20px 0;
}
.warp .lyr .lyrs pre {
  font-size: 14px;
  line-height: 20px;
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
