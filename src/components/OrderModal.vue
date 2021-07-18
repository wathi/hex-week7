<template>
    <div id="orderModal" :class="{'hidden': !orderModalShow}">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="border-box">
          <div class="bg-black fixed z-10 inset-0 opacity-30"></div>
          <div class="fixed inset-0 z-20">
              <div class="flex justify-center items-center h-screen">
                  <div class="bg-white p-10 rounded-xl">
                    <h3 class="text-center mb-2 ">Edit Order</h3>
                    <div class="text-red-500" v-for="msg in errMsg" :key="msg">{{msg}}</div>
                          <div class="grid grid-cols-2 gap-2 mb-4">
                              <div>
                                Create at
                                {{ create_at }}
                              </div>
                              <div>
                                Total
                                {{ total }}
                              </div>
                              <div>
                                Payment method
                                {{ payment_method }}
                              </div>
                              <label for="is_paid">Paid
                                  <select type="checkbox" id="is_paid" class="border p-1 text-black"
                                    name="is_paid" :value="is_paid"
                                    @input="$emit('update:is_paid', $event.target.value)">
                                    <option value="true">Paid</option>
                                    <option value="false">Not Settled</option>
                                    </select>
                              </label>
                          </div>
                      <div class="flex flex-row justify-end">
                          <button class="border ml-2 p-2" @click="hideOrderModal">
                            取消
                          </button>
                          <button class="border ml-2 p-2" @click="editOrder">
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
    create_at: Number,
    is_paid: Boolean,
    message: String,
    payment_method: String,
    total: Number,
    orderModalShow: Boolean,
    errMsg: Array,
  },
  methods: {
    hideOrderModal() {
      this.$emit('hideOrderModal');
    },
    editOrder() {
      this.$emit('editOrder');
    },
  },
};
</script>
