<template>
  <div class="box-border">
    <div>this is banner</div>
    <nav class="flex flex-row px-6 justify-between container max-w-4xl lg:max-w-6xl mx-auto">
      <div>
        <a href="">Logo</a>
      </div>
      <div id="nav" class="flex flex-row">
        <router-link to="/" class="p-4 text-lg border-l-2 border-r-2
          hover:text-yellow-900 hover:bg-gray-50">Home</router-link>
        <router-link :to="{ name: 'ItemAll' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Item</router-link>
        <router-link :to="{ name: 'Blog' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Blog</router-link>
      </div>
    </nav>
    <div>
      <router-view />
    </div>
    <footer>
      <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
        <small class="p-1">Copyright © 2021</small> |
        <small class="p-1">backend</small>
      </div>
    </footer>
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
