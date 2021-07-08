<template>
    <div id="Modal" :class="{'hidden': !productModalShow}">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="border-box">
          <div class="bg-black fixed z-10 inset-0 opacity-30"></div>
          <div class="fixed inset-0 z-20">
              <div class="flex justify-center items-center h-screen">
                  <div class="bg-white p-10 rounded-xl">
                    <h3 class="text-center mb-2 " v-if="isNew">新增產品</h3>
                    <h3 class="text-center mb-2 " v-else>修改產品內容</h3>
                    <div class="text-red-500" v-for="msg in errMsg" :key="msg">{{msg}}</div>
                      <div class="flex flex-row">
                          <div class="mr-2">
                              <img class="w-auto"
                                :src="imageUrl" alt="">
                              <label for="imageUrl" class="form-label">圖片地址
                                <input id="imageUrl"  class="border p-2" name="imageUrl"
                                  type="url" :value="imageUrl"
                                  @input="$emit('update:imageUrl', $event.target.value)">
                               </label>
                          </div>
                          <div class="grid grid-cols-2 gap-2 mb-4">
                              <label for="category">分類
                              <input id="category" class="border p-2" name="category" type="text"
                                :value="category"
                                @input="$emit('update:category', $event.target.value)"
                                required>
                              </label>
                              <label for="title">標題
                                 <input id="title" class="border p-2" name="title"
                                  :value="title" type="text"
                                   @input="$emit('update:title', $event.target.value)"
                                  required>
                              </label>
                              <label for="description">說明
                                <input id="description"  class="border p-2" name="description"
                                  type="text" :value="description"
                                  @input="$emit('update:description', $event.target.value)"
                                  required>
                              </label>
                              <label for="content">內容
                                <input id="content"  class="border p-2" name="content"
                                  type="textarea" :value="content"
                                  @input="$emit('update:content', $event.target.value)"
                                  required>
                              </label>
                              <label for="origin_price">原價
                                <input id="origin_price"  class="border p-2"
                                  name="origin_price" type="number" min="0"
                                  :value="origin_price"
                                  @input="$emit('update:origin_price', $event.target.value)"
                                  required>
                              </label>
                              <label for="price">現價
                                <input id="price"  class="border p-2" name="price"
                                  type="number" min="0" :value="price"
                                  @input="$emit('update:price', $event.target.value)">
                              </label>
                              <label for="unit">單位
                                <input id="unit"  class="border p-2" name="unit"
                                  type="text" :value="unit"
                                  @input="$emit('update:unit', $event.target.value)">
                              </label>
                              <label for="is_enabled">是否啟用
                                  <select id="is_enabled" class="border p-1 text-black"
                                    name="is_enabled" :value="is_enabled"
                                    @input="$emit('update:is_enabled', $event.target.value)">
                                    <option value="1">啟用</option>
                                    <option value="0">停用</option>
                                  </select>
                              </label>
                          </div>
                      </div>
                      <div class="flex flex-row justify-end">
                          <button class="border ml-2 p-2" @click="hideProductModal">
                            取消
                          </button>
                          <button class="border ml-2 p-2" @click="addProduct" v-if="isNew">
                            新增
                          </button>
                          <button class="border ml-2 p-2" @click="editProduct" v-else>
                            修改
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    title: String,
    category: String,
    origin_price: Number,
    price: Number,
    unit: String,
    description: String,
    content: String,
    imageUrl: String,
    is_enabled: Number,
    productModalShow: Boolean,
    isNew: Boolean,
    errMsg: Array,
  },
  methods: {
    hideProductModal() {
      this.$emit('hideProductModal');
    },
    addProduct() {
      this.$emit('addProduct');
    },
    editProduct() {
      this.$emit('editProduct');
    },
  },
};
</script>
