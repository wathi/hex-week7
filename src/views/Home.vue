<template>
  <div class="box-border">
    <nav class="flex flex-row px-6 justify-between
      container max-w-4xl lg:max-w-6xl mx-auto mt-6 mb-6">
      <div>
        <a href="">Logo</a>
      </div>
      <div id="nav" class="flex flex-row">
        <router-link to="/" class="p-4 text-lg border-l-2 border-r-2
          hover:text-yellow-900 hover:bg-gray-50">Home</router-link>
        <router-link :to="{ name: 'Products' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Item</router-link>
        <router-link :to="{ name: 'Blog' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Blog</router-link>
        <router-link :to="{ name: 'Cart' }" class="p-4 text-lg border-r-2
          hover:text-yellow-900 hover:bg-gray-50">
          Cart</router-link>
      </div>
    </nav>
    <div>
      <router-view />
    </div>
    <footer>
      <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
        <small class="p-1">Copyright © 2021</small> |
        <small class="p-1"><router-link :to="{ name: 'Login' }">後台管理</router-link></small>
      </div>
    </footer>
  </div>
</template>
