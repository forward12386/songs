{<template>
  <div>
    <div class="wrap">
      <div class="box">
        <div class="inputBar">
          <input type="text" v-model="search" @keyup.enter="SearchBar" />
          <button class="searchbar" @click="SearchBar">搜索</button>
        </div>
        <div class="musicInfo">
          <table v-if="searchMusicInfo != null">
            <thead>
              <td></td>
              <td>歌曲名</td>
              <td>歌手</td>
              <td>专辑</td>
            </thead>
            <tr v-for="(item, index) in searchMusicInfo" :key="index">
              <td>{{ index + 1 }}</td>
              <td @click="playMusic(index)">
                {{ item.name }}
              </td>
              <td>
                <span
                  v-for="(ar, ind) in item.artists"
                  :key="ind"
                  @click="tosinger(index, ind)"
                  >{{ ar.name + "&nbsp;" }}</span
                >
              </td>
              <td @click="toAlbum(index)">
                {{ item.album.name }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
      searchMusicInfo: [],
    };
  },
  methods: {
    ...mapMutations(["getSearch"]),
    playMusic(index) {
      this.$router.push({
        path: "/lyric",
        query: {
          id: this.searchMusicInfo[index].id,
        },
      });
    },
    SearchBar() {
      this.$store.commit("getSearch", this.search);
      this.$axios
        .get(
          "http://localhost:3000/search?keywords= " +
            this.$store.state.searchMusic
        )
        .then((res) => {
          this.searchMusicInfo = res.data.result.songs;
          // console.log(this.searchMusicInfo);
        })
        .catch((err) => {
          alert("暂无结果");
          console.log(err);
        });
    },
    tosinger(index, ind) {
      this.$router.push({
        path: "/singer",
        query: {
          singerid: this.searchMusicInfo[index].artists[ind].id,
        },
      });
    },
    toAlbum(index) {
      this.$router.push({
        path: "/album",
        query: {
          id: this.searchMusicInfo[index].album.id,
        },
      });
    },
  },
  mounted() {
    this.search = this.$store.state.searchMusic;
    this.$axios
      .get(
        "http://localhost:3000/search?keywords= " +
          this.$store.state.searchMusic
      )
      .then((res) => {
        this.searchMusicInfo = res.data.result.songs;
      })
      .catch((err) => {
        alert("暂无结果");
        console.log(err);
      });
  },
};
</script>
<style>
.wrap {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ff0000;
}
.wrap .box {
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.wrap .box .inputBar input {
  width: 300px;
  height: 30px;
  border: 1px solid #e2e2e2;
  border-radius: 1px 1px 1px 1px;
  outline: none;
  color: #333333;
  font-size: 12px;
}
.wrap .box .inputBar .searchbar {
  border: 1px solid #e2e2e2;
  outline: none;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  color: #333333;
}
.wrap .box .musicInfo {
  margin: 20px 0;
}
.wrap .box .musicInfo table {
  border: 1px solid #e2e2e2;
  border-top: 2px solid #ff0000;
  border-collapse: collapse;
}
.wrap .box .musicInfo table td {
  border: 1px solid #e2e2e2;
  height: 21px;
  width: 210px;
  overflow: hidden;
  cursor: pointer;
}
.wrap .box .musicInfo table td:nth-child(1) {
  border: 1px solid #e2e2e2;
  height: 21px;
  width: 10px;
  overflow: hidden;
}
</style>
}
