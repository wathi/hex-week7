<template>
  <div class="box-border">
    <nav class="flex flex-row px-6 justify-between
      container max-w-4xl lg:max-w-6xl mx-auto mt-6 mb-6 items-center">
      <div>
        Backend Management
      </div>
      <div>
        <router-link :to="{ name: 'AdminProduct' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Product</router-link>
        <router-link :to="{ name: 'AdminOrder' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Order</router-link>
      </div>

    </nav>
    <div>
      <router-view />
    </div>
      <footer>
        <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
          <small class="p-1">Copyright © 2021</small> |
          <small class="p-1"><router-link :to="{ name: 'Index' }">Home</router-link></small> |
          <small class="p-1"><button @click="adminLogout">Logout</button></small>
        </div>
      </footer>
  </div>
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
            // this.$router.push({ name: 'Admin' });
            console.log(res.data);
          } else {
            console.log(res.data);
            this.$router.push({ name: 'Login' });
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
            this.$router.push({ name: 'login' });
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
