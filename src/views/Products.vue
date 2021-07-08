<template>
<div>this is navigation</div>
  <div class="grid grid-cols-2 lg:grid-cols-3 p-6">
    <div class="border p-6" v-for="product in products" :key="product.id">
      <router-link :to="{ name: 'Product', params: { id: `${product.id}` }}">
        <img :src="product.imageUrl" alt="" class="w-auto">
        <div>{{ product.title }}</div>
        <div class="mb-4">{{ product.description }}</div>
        <div>
          <span class="line-through text-gray-500">
            {{ currency }}{{ product.origin_price }}
          </span>
          {{ currency }}{{ product.price }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      currency: '¥',
    };
  },
  inject: ['apiInfo'],
  methods: {
    getProducts(page = 1) {
      axios.get(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/products?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.products);
            this.products = res.data.products;
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
