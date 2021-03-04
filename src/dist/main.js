"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
require("./registerServiceWorker");
var router_1 = require("./router");
var store_1 = require("./store");
var axios_1 = require("axios");
var element_ui_1 = require("element-ui");
require("element-ui/lib/theme-chalk/index.css");
vue_1["default"].config.productionTip = false;
vue_1["default"].prototype.$axios = axios_1["default"];
vue_1["default"].use(element_ui_1["default"]);
new vue_1["default"]({
    router: router_1["default"],
    store: store_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount("#app");
