import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Item from '../views/Item.vue';
import Category from '../views/Category.vue';
import Products from '../views/Products.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import Blog from '../views/Blog.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    children: [
      {
        path: 'all',
        name: 'ItemAll',
        components: {
          sidebar: Category,
          main: Products,
        },
      },
      {
        path: ':id',
        name: 'ItemSingle',
        components: {
          sidebar: Category,
          main: Product,
        },
        props: (route) => ({ id: route.params.id }),
      },
    ],
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
