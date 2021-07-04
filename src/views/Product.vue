<template>
  <div class="">
    <div class="text-2xl pr-10 py-10">{{ this.product.title }}</div>
    <img :src="this.product.imageUrl" alt="" class="w-auto mb-10">
    <div class="flex flex-row justify-between">
      <div class="">{{ this.product.content}}</div>
      <div class="bg-gray-100 text-gray-700 py-10 px-20">
        <div class="mb-2">Price
          <span class="text-red-600 font-bold">{{ this.currency }}{{ this.product.price }}</span>
        </div>
        <div class="mb-2">Qty <input type="number" value="1" class="border w-10 p-1"></div>
        <button class="border p-2 bg-white hover:bg-gray-50">add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {},
      currency: '¥',
    };
  },
  inject: ['apiInfo'],
  methods: {
    getProduct(itemId) {
      axios.get(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/product/${itemId}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.product);
            this.product = res.data.product;
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
    console.log(this.$route.params);
    const itemId = this.$route.params.id;
    this.getProduct(itemId);
  },
};
</script>
