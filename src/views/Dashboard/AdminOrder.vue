<template>
  <!-- <div> -->
    <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
      <div id="backend-order">

        <h3 class="text-center text-xl mb-4">Order Management</h3>
          <OrderModal
            v-model:create_at="tempOrder.create_at"
            v-model:is_paid="tempOrder.is_paid"
            v-model:message="tempOrder.message"
            v-model:payment_method="tempOrder.payment_method"
            v-model:total.number="tempOrder.total"
            v-model:orderModalShow="orderModalShow"
            :errMsg="errMsg"
            @hideOrderModal="hideOrderModal"
            @editOrder="editOrder"
            />

        <div id="admin-order" class="">
          <table class="table">
            <thead>
              <tr>
                <th class="pr-2 text-left">Create at</th>
                <th class="pr-2 text-left">Order no.</th>
                <th class="pr-2 text-left">Amount</th>
                <th class="pr-2 text-left">Status</th>
                <th class="pr-2 text-left">Paid Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="order in orders" :key="order.id">
                <tr>
                  <td class="pr-2">{{ order.create_at }}</td>
                  <td class="pr-2">{{ order.num }}</td>
                  <td class="pr-2">{{ order.total }}</td>
                  <td class="pr-2" v-if="order.is_paid">Paid</td>
                  <td class="pr-2" v-else>Not Settle</td>
                  <td class="pr-2" v-if="order.paid_date">{{ new Date(order.paid_date) }}</td>
                  <td class="pr-2" v-else></td>
                  <td>
                    <button value="order.id" class="border"
                      @click="getEditOrder(order)">修改</button>
                  </td>
                  <td class="text-center">
                    <button value="order.id" class="border"
                      @click="deleteOrder(order.id)">刪除</button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <pagination :page="pagination"
          @get-product-page="getOrderAdmin"
          @previous-page="getOrderAdmin"
          @next-page="getOrderAdmin"></pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    OrderModal,
    Pagination,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      errMsg: [],
      orderModalShow: false,
    };
  },
  inject: ['apiInfo'],
  methods: {
    getOrderAdmin(page = 1) {
      this.orders = [];
      axios.get(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/orders?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            this.orders = res.data.orders;
            this.pagination = res.data.pagination;
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showOrderModal() {
      this.errMsg = [];
      this.orderModalShow = !this.orderModalShow;
    },
    hideOrderModal() {
      this.tempOrder = {};
      this.errMsg = [];
      this.orderModalShow = false;
    },
    getEditOrder(item) {
      this.orders.forEach((order) => {
        if (order.id === item.id) {
          console.log(order);
          Object.assign(this.tempOrder, order);
        }
      });
      console.log(this.tempOrder);
      this.showOrderModal();
    },
    editOrder() {
      console.log(this.tempOrder.id);
      axios.put(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/order/${this.tempOrder.id}`, {
        data: {
          create_at: this.tempOrder.create_at,
          is_paid: this.tempOrder.is_paid,
          message: this.tempOrder.message,
          payment_method: this.tempOrder.payment_method,
          products: this.tempOrder.products,
          total: this.tempOrder.total,
          user: this.tempOrder.user,
        },
      })
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            this.hideProductModal();
            this.getProductAdmin();
          } else {
            res.data.message.forEach((msg) => {
              this.errMsg.push(msg);
            });
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
    deleteOrder(orderid) {
      console.log('delete order: ', orderid);
      axios.delete(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/order/${orderid}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.getOrderAdmin();
            alert('Order has been deleted');
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

  },
  mounted() {
    this.getOrderAdmin();
  },
};
</script>
