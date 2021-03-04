import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch((err) => err);
// };
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "recomment",
    component: () => import("../views/recomment.vue"),
  },
  {
    path: "/mv",
    name: "mv",
    component: () => import("../views/mv.vue"),
  },
  {
    path: "/radiostation",
    name: "radiostation",
    component: () => import("../views/radiostation.vue"),
  },
  {
    path: "/songdetails",
    name: "songdetails",
    component: () => import("../views/songdetails.vue"),
  },
  {
    path: "/singer",
    name: "singer",
    component: () => import("../views/singer.vue"),
  },
  {
    path: "/lyric",
    name: "lyric",
    component: () => import("../views/lyric.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/playMv",
    name: "playMv",
    component: () => import("../views/playMv.vue"),
  },
  {
    path: "/searchMusic",
    name: "searchMusic",
    component: () => import("../views/searchMusic.vue"),
  },
  {
    path: "/album",
    name: "album",
    component: () => import("../views/album.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    let token = localStorage.getItem("Authorization");
    if (token === null || token === "") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
