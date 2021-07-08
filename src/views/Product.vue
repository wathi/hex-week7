<template>
  <div class="container max-w-4xl lg:max-w-6xl mx-auto mt-6 mb-6">
    <div class="text-2xl pr-10 py-10">{{ product.title }}</div>
    <img :src="product.imageUrl" alt="" class="w-auto mb-10">
    <div class="flex flex-row justify-between">
      <div class="">{{ product.content}}</div>
      <div class="bg-gray-100 text-gray-700 py-10 px-20">
        <div class="mb-2">Price
          <span class="text-red-600 font-bold">{{ currency }}{{ product.price }}</span>
        </div>
        <div class="mb-2">Qty <input type="number"
          v-model.number="qty" class="border w-10 p-1 w-20"></div>
        <button class="border p-2 bg-white hover:bg-gray-50"
          @click="addCart(product.id, qty)">add to cart</button>
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
      qty: 1,
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
    addCart(id, qty = 1) {
      // this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      console.log(cart);
      axios.post(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/cart`, { data: cart })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            // this.loadingStatus.loadingItem = '';
            console.log(res.data);
            // this.getCart();
          } else {
            console.log(res.data);
            alert(res.data.message);
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
