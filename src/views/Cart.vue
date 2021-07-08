<template>
  <div class="container max-w-4xl lg:max-w-6xl mx-auto mt-6 mb-6">
    <div>
      <h2>購物車</h2>
    </div>
    <div>
      <table class="mx-auto">
        <thead>
          <tr>
            <th>貨品</th>
            <th>數量</th>
            <th>小計</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>
                <input class="w-20" type="number" min="1" v-model.number="item.qty"
                @change="updateCart(item)">
                <!-- :disabled="item.id === loadingStatus.loadingItem" -->
              </td>
              <td>{{ item.total }}</td>
              <td><button type="button" class="border"
                @click="deleteOne(item)">刪除</button></td>
                <!-- :disabled="item.id === loadingStatus.loadingItem" -->
            </tr>
          </template>
          <template v-if="cart.total !== 0">
            <tr>
              <td>
                合計: {{ cart.final_total }}
              </td>
              <td>
                <button type="button" class="border"
                  @click="deleteAll">刪除全部</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <router-link :to="{ name: 'DeliveryInfo' }">填寫送貨資料</router-link>
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
