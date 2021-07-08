<template>
  <div class="container mx-auto ">
    {{ order }}
    <div>
      <div>status: {{ order.is_paid }}</div>
      <div>price:{{ order.total }}</div>
    </div>
    <div>
      <button class="border" @click="completePayment(order.id)">Paid</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      order: {},
    };
  },
  inject: ['apiInfo'],
  methods: {
    getOrder(id) {
      axios.get(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/order/${id}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            this.order = res.data.order;
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    completePayment(id) {
      axios.post(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/pay/${id}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            this.$router.push({ name: 'OrderComplete' });
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
    const orderId = this.$route.params.id;
    this.getOrder(orderId);
  },
};
</script>
