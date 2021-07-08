<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiInfo: {
        apiPath: process.env.VUE_APP_PATH,
        apiName: process.env.VUE_APP_API,
      },
    };
  },
  provide() {
    return {
      apiInfo: this.apiInfo,
    };
  },
};
</script>
