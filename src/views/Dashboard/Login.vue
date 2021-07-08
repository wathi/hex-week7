<template>
  <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
    <div id="login">
      <div class="error-msg text-center mb-2" v-if="errMsg">{{errMsg}}</div>
      <form class="flex flex-row justify-center">
        <div>
          <h1 class="text-xl">後台登入</h1>
          <div class="mb-2">
            <label for="inputEmail" class="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="p-2 border"
              placeholder="Email address"
              required
              autofocus
              v-model="logginUser.username"
            />
          </div>
          <div class="mb-2">
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="p-2 border"
              placeholder="Password"
              required
              v-model="logginUser.password"
            />
          </div>
          <div class="">
            <button class="border px-6" type="button" @click="authLogin">登入</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      logginUser: {
        username: '',
        password: '',
      },
      errMsg: '',
    };
  },
  inject: ['apiInfo'],
  methods: {
    authLogin() {
      console.log('authloggin', this.logginUser);
      axios.post(`${this.apiInfo.apiPath}/admin/signin`, this.logginUser)
        .then((res) => {
          if (res.data.success) {
            document.cookie = `OnlineBusTour=${res.data.token}; expires=${new Date(res.data.expired)}`;
            this.errMsg = '';
            this.$router.push('Edit');
            console.log('login success');
          }
          if (!res.data.success) {
            this.errMsg = res.data.message;
            console.log(res.data.message);
            this.$router.push('Login');
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>
