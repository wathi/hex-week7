<template>
  <nav aria-label="Page navigation example" class="">
    <ul class="pagination flex flex-row">
      <li class="p-2" :class="{'disabled' : !page.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
          @click="$emit('previous-page', page.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="p-2" :class="{'active' : item === page.current_page}"
        v-for="item in page.total_pages" :key="item">
        <button class="page-link" @click="$emit('get-product-page', item)">{{item}}</button></li>
      <li class="p-2" :class="{'disabled' : !page.has_next}">
        <a class="page-link" href="#" aria-label="Next"
          @click="$emit('next-page', page.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
};
</script>
