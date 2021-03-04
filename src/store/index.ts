import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recommend: [], //推荐歌单列表
    recommendlimit: 100, //歌单个数
    detailPlaylist: [], //推荐歌单列表详情
    detail: [],
    banners: [],
    songurl: "",
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
    loginTxt: "",
    userInfo: [],
    searchMusic: "",
    Profile: localStorage.getItem("Profile")
      ? localStorage.getItem("Profile")
      : "",
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem("Authorization", user.Authorization);
    },
    getProfile(state, pro) {
      state.Profile = pro;
      localStorage.setItem("Profile", pro);
    },
    changeloginTxt(state, logintxt) {
      state.loginTxt = logintxt;
    },
    getdetailByindex(state, index) {
      state.detail = state.detailPlaylist[index];
    },
    getSongUrl(state, url) {
      state.songurl = url;
    },
    getSearch(state, songs) {
      state.searchMusic = songs;
    },
  },
  actions: {
    //歌单
    async getrecommend({ commit, state }) {
      await axios({
        method: "get",
        url:
          "http://localhost:3000/top/playlist/highquality?limit=" +
          state.recommendlimit,
      })
        .then((res) => {
          state.recommend = res.data;
          state.detailPlaylist = res.data.playlists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getbanners({ commit, state }) {
      await axios
        .get("http://localhost:3000/banner")
        .then(function(res) {
          state.banners = res.data.banners;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
  },
  getters: {},
  modules: {},
});
