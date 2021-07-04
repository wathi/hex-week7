<template>
  <div class="bg-gray-100">
    This is title
  </div>
  <div class="container max-w-4xl lg:max-w-6xl mx-auto">
    <div class="grid grid-cols-6 gap-4">
      <div clas="bg-red-100">
        <router-view name="sidebar"></router-view>
      </div>
      <div class="col-span-5">
        <router-view name="main"></router-view>
      </div>
    </div>
  </div>
</template>
