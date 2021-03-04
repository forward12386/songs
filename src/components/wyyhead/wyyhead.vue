<template id="head">
  <div>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-dark flex">
          <div class="logo">
            <img src="../../assets/img/logo.png" />
            <span class="title">網易雲音樂</span>
          </div>
          <ul>
            <li
              v-for="(item, index) in navlist"
              :key="index"
              :class="active == index ? 'navactive' : ''"
              @click="change(index)"
            >
              <router-link :to="item.to" name="recomment" tag="span">{{
                item.navname
              }}</router-link>
            </li>
          </ul>
          <div>
            <el-input
              placeholder="搜索歌曲"
              value="string"
              prefix-icon="el-icon-search"
              v-model="search"
              @change="SearchMusic"
            >
            </el-input>
          </div>
          <el-avatar :size="36" src="" v-if="!state == false"></el-avatar>

          <div @click.stop="loginBar()" class="login">
            <span v-if="this.$store.state.Profile !== ''">{{
              this.$store.state.Profile + ","
            }}</span>
            {{ this.$store.state.loginTxt }}
          </div>
        </div>
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
      active: 0,
      loginTxt: "",
      searchMusicInfo: [],
      state: false,
      navlist: [
        {
          id: 1,
          navname: "歌单",
          to: "/",
        },
        {
          id: 2,
          navname: "MV",
          to: "/mv",
        },
        // {
        //   id: 3,
        //   navname: "电台",
        //   to: "/radiostation",
        // },
        // {
        //   id: 4,
        //   navname: "排行榜",
        //   to: "/mv",
        // },
        // {
        //   id: 5,
        //   navname: "数字专辑",
        //   to: "/mv",
        // },
      ],
    };
  },
  computed: {
    ...mapState(["Authorization"]),
  },
  methods: {
    ...mapMutations(["changeloginTxt", "getSearch"]),
    change(index) {
      this.active = index;
    },
    loginBar() {
      let loginFlag = this.$store.state.Authorization;
      if (loginFlag == "" || loginFlag == null) {
        this.$router.replace("/login");
      }
      if (this.$store.state.loginTxt === "退出登录") {
        this.$store.state.Authorization = "";
        this.$store.state.Profile = "";
        this.$axios
          .get("http://localhost:3000/logout")
          .then((res) => {
            alert("用户已退出");
          })
          .catch((err) => {
            console.log(err);
          });
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Profile");
        this.$store.commit("changeloginTxt", "登录");
        this.$router.replace("/login");
        this.$store.state.songurl = "";
      }
    },
    SearchMusic() {
      let that = this;
      that.$store.commit("getSearch", this.search);
      if (that.search != "") {
        that.$router.push({
          path: "/searchMusic",
        });
      }
    },
  },

  mounted() {
    let loginFlag = this.$store.state.Authorization;
    if (loginFlag != "") {
      this.$store.commit("changeloginTxt", "退出登录");
    } else {
      this.$store.commit("changeloginTxt", "登录");
      this.$router.replace("/login");
    }
  },
};
</script>

<style>
.el-row .el-col:nth-child(2) {
  width: 100%;
  height: 70px;
  background-color: #242424;
}

.flex {
  margin: 0 auto;
  height: 70px;
  width: 80%;
  background-color: #242424;
  color: #ffffff;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.flex img {
  width: 30px;
  height: 30px;
  border-radius: 60px;
}
.flex ul {
  height: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.logo {
  display: flex;
  justify-items: start;
  align-items: center;
}
.logo span {
  font-size: 18px;
  margin: 0 10px;
}
.flex ul li {
  height: 100%;
  width: 64px;
  padding: 0 10px;
}
.flex ul li:hover {
  cursor: pointer;
}
.flex ul li span {
  height: 100%;
  width: 64px;
  text-align: center;
  display: flex;
  align-items: center;

  justify-content: center;
}
.flex input {
  height: 32px;
  width: 158px;
  border: 0;
  border-radius: 32px;
  outline: none;
  padding-left: 10px;
  font-size: 10px;
}
.flex .creator-center {
  height: 32px;
  line-height: 32px;
  width: 90px;
  border: 1px solid #ccc;
  border-radius: 32px;
  text-align: center;
  font-size: 10px;
  color: #cccccc;
}
.login {
  color: #cccccc;
  font-size: 14px;
  cursor: pointer;
}
.navactive {
  background: #000000;
}
</style>
