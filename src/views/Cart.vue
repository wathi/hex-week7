<template>
  <div class="bg-gray-100 p-6 text-xl text-gray-500">
    <div class="container max-w-4xl lg:max-w-6xl mx-auto">
      Shopping Cart
    </div>
  </div>

  <div class="container max-w-4xl lg:max-w-6xl mx-auto mt-6 mb-6">
    <div>
      <table class="mx-auto mb-2">
        <thead>
          <tr>
            <th class="pr-2">Product</th>
            <th class="pr-2">Qty</th>
            <th class="pr-2">Sub Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="pr-2">{{ item.product.title }}</td>
              <td class="pr-2">
                <input class="w-20" type="number" min="1" v-model.number="item.qty"
                @change="updateCart(item)">
                <!-- :disabled="item.id === loadingStatus.loadingItem" -->
              </td>
              <td class="pr-2">{{ item.total }}</td>
              <td><button type="button" class="border p-1"
                @click="deleteOne(item)">Delete</button></td>
                <!-- :disabled="item.id === loadingStatus.loadingItem" -->
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="cart.total !== 0" class="border-t-2 pt-2">
        <div class="flex flex-row justify-end p-6">
          <div class="mr-2">
            Total: {{ cart.final_total }}
          </div>
          <div>
            <button type="button" class="border p-1"
              @click="deleteAll">Clear Cart</button>
          </div>
        </div>
        <div class="px-6">
          <router-link :to="{ name: 'DeliveryInfo' }"  class="border p-1">Next Step</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cart: {},
      products: [],
      currency: '¥',
    };
  },
  inject: ['apiInfo'],
  methods: {
    getCart() {
      axios.get(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/cart`)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            console.log(this.cart);
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCart(item) {
      // this.loadingStatus.loadingItem = item.id;
      const cart = {
        product_id: item.product.id,
        qty: item.qty,
      };
      axios.put(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/cart/${item.id}`, { data: cart })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            // this.loadingStatus.loadingItem = '';
            this.getCart();
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteOne(item) {
      // this.loadingStatus.loadingItem = item.id;
      axios.delete(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/cart/${item.id}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            alert(res.data.message);
            // this.loadingStatus.loadingItem = '';
            this.getCart();
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteAll() {
      axios.delete(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/carts`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            alert(res.data.message);
            this.getCart();
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
    this.getCart();
  },
};
</script>
