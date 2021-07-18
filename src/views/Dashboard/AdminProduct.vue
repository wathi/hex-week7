<template>
  <!-- <div> -->
    <div class="container max-w-4xl lg:max-w-6xl mx-auto p-6 flex justify-center">
      <div id="backend">
        <h3 class="text-center text-xl mb-4">Product Management</h3>
        <button id="add-product" class="mb-6 border p-2" type="button"
          @click="showProductModal(true)">Add New</button>
          <ProductModal
            v-model:title="tempProduct.title"
            v-model:category="tempProduct.category"
            v-model:origin_price.number="tempProduct.origin_price"
            v-model:price.number="tempProduct.price"
            v-model:unit="tempProduct.unit"
            v-model:description="tempProduct.description"
            v-model:content="tempProduct.content"
            v-model:imageUrl="tempProduct.imageUrl"
            v-model:is_enabled.number="tempProduct.is_enabled"
            v-model:productModalShow="productModalShow"
            v-model:isNew="isNew"
            :errMsg="errMsg"
            @hideProductModal="hideProductModal"
            @addProduct="addProduct"
            @editProduct="editProduct"
            />

        <div id="admin-product" class="" >
          <table class="table">
            <thead>
              <tr>
                <th class="pr-2 text-left">Name</th>
                <th class="pr-2 text-left">Description</th>
                <th class="pr-2 text-left">Image</th>
                <th class="pr-2 text-left">Original</th>
                <th class="pr-2 text-left">Price</th>
                <th class="pr-2 text-left">Active</th>
                <th class="pr-2"></th>
                <th class="pr-2"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in products" :key="product.id">
                <tr>
                  <td class="pr-2">{{ product.title }}</td>
                  <td class="pr-2">{{ product.description }}</td>
                  <td class="pr-2"><img class="w-20" :src="product.imageUrl" alt=""></td>
                  <td class="pr-2">{{ currency }}{{ product.origin_price }}</td>
                  <td class="pr-2">{{ currency }}{{ product.price }}</td>
                  <td class="pr-2" v-if="product.is_enabled">on</td>
                  <td class="pr-2" v-else>off</td>
                  <td class="pr-2">
                    <button value="product.id" class="border p-2"
                      @click="getEditProduct(false, product)">Edit</button>
                  </td>
                  <td class="pr-2">
                    <button value="product.id" class="border p-2"
                      @click="deleteProduct(product.id)">Delete</button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <pagination :page="pagination"
          @get-product-page="getProductAdmin"
          @previous-page="getProductAdmin"
          @next-page="getProductAdmin"></pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import ProductModal from '@/components/ProductModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductModal,
    Pagination,
  },
  data() {
    return {
      products: [],
      currency: '¥',
      tempProduct: {},
      errMsg: [],
      pagination: {},
      productModalShow: false,
      isNew: false,
    };
  },
  inject: ['apiInfo'],
  methods: {
    getProductAdmin(page = 1) {
      this.products = [];
      axios.get(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/products?page=${page}`)
        .then((res) => {
          console.log(res.data.products);
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          this.error();
        });
    },
    showProductModal(action) {
      this.errMsg = [];
      this.productModalShow = !this.productModalShow;
      this.isNew = action;
    },
    hideProductModal() {
      this.tempProduct = {};
      this.errMsg = [];
      this.productModalShow = false;
    },
    addProduct() {
      axios.post(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/product`, {
        data: {
          title: this.tempProduct.title,
          category: this.tempProduct.category,
          origin_price: this.tempProduct.origin_price,
          price: this.tempProduct.price,
          unit: this.tempProduct.unit,
          description: this.tempProduct.description,
          content: this.tempProduct.content,
          imageUrl: this.tempProduct.imageUrl,
          is_enabled: this.tempProduct.is_enabled,
        },
      })
        .then((res) => {
          if (res.data.success) {
            this.tempProduct = {};
            this.hideProductModal();
            this.getProductAdmin();
          } else {
            res.data.message.forEach((msg) => {
              this.errMsg.push(msg);
            });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getEditProduct(action, item) {
      this.products.forEach((product) => {
        if (product.id === item.id) {
          console.log(product);
          Object.assign(this.tempProduct, product);
        }
      });
      console.log(this.tempProduct);
      this.showProductModal(action);
    },
    editProduct() {
      console.log(this.tempProduct.id);
      axios.put(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/product/${this.tempProduct.id}`, {
        data: {
          title: this.tempProduct.title,
          category: this.tempProduct.category,
          origin_price: this.tempProduct.origin_price,
          price: this.tempProduct.price,
          unit: this.tempProduct.unit,
          description: this.tempProduct.description,
          content: this.tempProduct.content,
          imageUrl: this.tempProduct.imageUrl,
          is_enabled: this.tempProduct.is_enabled,
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
    deleteProduct(productid) {
      console.log('delete product: ', productid);
      axios.delete(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/admin/product/${productid}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.getProductAdmin();
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
    this.getProductAdmin();
  },
};
</script>
