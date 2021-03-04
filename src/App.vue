<template>
  <div id="app">
    <wyyhead></wyyhead>
    <router-view></router-view>
    <div class="playbar">
      <audio
        :src="this.$store.state.songurl"
        autoplay
        preload="auto"
        controls
        volume="50"
      ></audio>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import wyyhead from "./components/wyyhead/wyyhead.vue";

export default {
  name: "app",
  components: {
    wyyhead,
  },
  computed: {
    ...mapMutations["getSongUrl"],
  },
  methods: {
    totatoil() {
      console.log(111);
    },
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style>
@import "./assets/css/normalize.css";
.playbar {
  color: green;
  position: fixed;
  bottom: 0;
  width: 100%;
  opacity: 0.98;
  background-color: #2e2e2e;
  height: 30px;
  cursor: pointer;
}
.playbar audio {
  width: 100%;
  height: 30px;
  margin: 0 auto;
}
</style>
