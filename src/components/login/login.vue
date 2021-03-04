<template>
  <div>
    <div class="wrap">
      <div class="box">
        <div class="logintxt">手机号登录</div>
        <div class="loginInp">
          <form action="#">
            <input
              type="number"
              name="phone"
              placeholder="请输入手机号"
              v-model="loginForm.lphone"
              autocomplete
            /><br />
            <input
              type="password"
              name="pwd"
              placeholder="请输入密码"
              v-model="loginForm.lpassword"
              autocomplete
            /><br />
          </form>
          <button @click="login()">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        lphone: "",
        lpassword: "",
      },
      userToken: "",
      username: "",
    };
  },
  methods: {
    ...mapMutations(["changeLogin"], ["changeloginTxt"], ["getProfile"]),
    login() {
      if (this.loginForm.lphone === "" || this.loginForm.lpassword === "") {
        alert("账号或密码不能为空");
      } else {
        this.$axios
          .get(
            "http://localhost:3000/login/cellphone?phone=" +
              this.loginForm.lphone +
              "&password=" +
              this.loginForm.lpassword
          )
          .then((res) => {
            if (res.data.code != 200) {
              alert(res.data.msg);
            } else {
              this.userToken = res.data.token;
              this.username = res.data.profile.nickname;
              this.$store.commit("getProfile", this.username);
              this.changeLogin({ Authorization: this.userToken });
              this.$router.push("/");
              alert("登录成功");
              this.$store.commit("changeloginTxt", "退出登录");
            }
          })
          .catch((err) => {
            alert("账号或密码错误");
            console.log(err);
          });
      }
    },
  },
};
</script>
<style>
.wrap {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.box {
  margin: 0 auto;
  width: 500px;
  height: 300px;
  border: 2px solid #2d2d2d;
  box-shadow: 2px 2px 2px 1px rgba(12, 12, 218, 0.2);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.box .logintxt {
  width: 100%;
  height: 25px;
  font-family: "Courier New", Courier, monospace;
  line-height: 25px;
  overflow: hidden;
  font-size: 12px;
  color: aliceblue;
  background: #2d2d2d;
}
.box .loginInp {
  margin: 20px;
}
.box .loginInp input,
button {
  padding: 10px;
  margin: 10px;
}
.box .loginInp input {
  outline: none;
}
.box .loginInp button {
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
