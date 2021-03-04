"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var axios_1 = require("axios");
vue_1["default"].use(vuex_1["default"]);
exports["default"] = new vuex_1["default"].Store({
    state: {
        recommend: [],
        recommendlimit: 100,
        detailPlaylist: [],
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
            : ""
    },
    mutations: {
        changeLogin: function (state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem("Authorization", user.Authorization);
        },
        getProfile: function (state, pro) {
            state.Profile = pro;
            localStorage.setItem("Profile", pro);
        },
        changeloginTxt: function (state, logintxt) {
            state.loginTxt = logintxt;
        },
        getdetailByindex: function (state, index) {
            state.detail = state.detailPlaylist[index];
        },
        getSongUrl: function (state, url) {
            state.songurl = url;
        },
        getSearch: function (state, songs) {
            state.searchMusic = songs;
        }
    },
    actions: {
        //歌单
        getrecommend: function (_a) {
            var commit = _a.commit, state = _a.state;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, axios_1["default"]({
                                method: "get",
                                url: "http://localhost:3000/top/playlist/highquality?limit=" +
                                    state.recommendlimit
                            })
                                .then(function (res) {
                                state.recommend = res.data;
                                state.detailPlaylist = res.data.playlists;
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getbanners: function (_a) {
            var commit = _a.commit, state = _a.state;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, axios_1["default"]
                                .get("http://localhost:3000/banner")
                                .then(function (res) {
                                state.banners = res.data.banners;
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    getters: {},
    modules: {}
});
