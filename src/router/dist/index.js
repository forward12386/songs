"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
vue_1["default"].use(vue_router_1["default"]);
// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch((err) => err);
// };
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };
var routes = [
    {
        path: "/",
        name: "recomment",
        component: function () { return Promise.resolve().then(function () { return require("../views/recomment.vue"); }); }
    },
    {
        path: "/mv",
        name: "mv",
        component: function () { return Promise.resolve().then(function () { return require("../views/mv.vue"); }); }
    },
    {
        path: "/radiostation",
        name: "radiostation",
        component: function () { return Promise.resolve().then(function () { return require("../views/radiostation.vue"); }); }
    },
    {
        path: "/songdetails",
        name: "songdetails",
        component: function () { return Promise.resolve().then(function () { return require("../views/songdetails.vue"); }); }
    },
    {
        path: "/singer",
        name: "singer",
        component: function () { return Promise.resolve().then(function () { return require("../views/singer.vue"); }); }
    },
    {
        path: "/lyric",
        name: "lyric",
        component: function () { return Promise.resolve().then(function () { return require("../views/lyric.vue"); }); }
    },
    {
        path: "/login",
        name: "login",
        component: function () { return Promise.resolve().then(function () { return require("../views/login.vue"); }); }
    },
    {
        path: "/playMv",
        name: "playMv",
        component: function () { return Promise.resolve().then(function () { return require("../views/playMv.vue"); }); }
    },
    {
        path: "/searchMusic",
        name: "searchMusic",
        component: function () { return Promise.resolve().then(function () { return require("../views/searchMusic.vue"); }); }
    },
    {
        path: "/album",
        name: "album",
        component: function () { return Promise.resolve().then(function () { return require("../views/album.vue"); }); }
    },
];
var router = new vue_router_1["default"]({
    mode: "history",
    routes: routes
});
router.beforeEach(function (to, from, next) {
    if (to.path === "/login") {
        next();
    }
    else {
        var token = localStorage.getItem("Authorization");
        if (token === null || token === "") {
            next("/login");
        }
        else {
            next();
        }
    }
});
exports["default"] = router;
