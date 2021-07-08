<template>
  <div>
    <router-view />
  </div>
      <footer>
      <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
        <small class="p-1">Copyright © 2021</small> |
        <small class="p-1"><router-link :to="{ name: 'Home' }">首頁</router-link></small> |
        <small class="p-1"><button @click="adminLogout">登出</button></small>
      </div>
    </footer>
</template>

<script>
import axios from 'axios';

export default {
  inject: ['apiInfo'],
  methods: {
    checkLogin() {
      axios.post(`${this.apiInfo.apiPath}/api/user/check`)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('Edit');
            console.log(res.data);
          } else {
            console.log(res.data);
            this.$router.push('Login');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    adminLogout() {
      axios.post(`${this.apiInfo.apiPath}/logout/`)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            document.cookie = `OnlineBusTour = ; expires = ${new Date()}`;
            this.$router.push('login');
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)OnlineBusTour\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>
