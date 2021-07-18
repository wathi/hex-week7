<template>
  <div class="bg-gray-100 p-6 text-xl text-gray-500">
    <div class="container max-w-4xl lg:max-w-6xl mx-auto">
      Delivery Information
    </div>
  </div>
  <div class="container max-w-4xl lg:max-w-6xl mx-auto">
    <div class="my-5 flex flex-row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }"  @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control"
                   :class="{ 'is-invalid': errors['email'] }" placeholder="Please enter Email"
                   rules="email|required" v-model="form.user.email"
                  ></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Receiver Name</label>
          <Field id="name" name="name" type="text" class="form-control"
            :class="{ 'is-invalid': errors['name'] }"
                   placeholder="Please enter receiver name"
                   rules="required"
                   v-model="form.user.name"
                   ></Field>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="text" class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
                   placeholder="請輸入電話"
                   rules="required"
                   v-model="form.user.tel"
                   ></Field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
                   placeholder="請輸入地址"
                   rules="required"
                   v-model="form.user.address"
                   ></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">建立訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        user: {
        },
      },
    };
  },
  inject: ['apiInfo'],
  methods: {
    createOrder() {
      const form = { ...this.form };
      axios.post(`${this.apiInfo.apiPath}/api/${this.apiInfo.apiName}/order`, { data: form })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            alert(res.data.message);
            this.$router.push({ name: 'Order', params: { id: res.data.orderId } });
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
