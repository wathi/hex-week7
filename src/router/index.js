import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Index from '../views/Index.vue';
import Products from '../views/Products.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import DeliveryInfo from '../views/Order/DeliveryInfo.vue';
import Order from '../views/Order/Order.vue';
import OrderComplete from '../views/Order/OrderComplete.vue';
import Blog from '../views/Blog.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Dashboard/Admin.vue';
import AdminProduct from '../views/Dashboard/AdminProduct.vue';
import AdminOrder from '../views/Dashboard/AdminOrder.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Index',
        component: Index,
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: Product,
        props: (route) => ({ id: route.params.id }),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: 'deliveryinfo',
        name: 'DeliveryInfo',
        component: DeliveryInfo,
      },
      {
        path: 'order/:id',
        name: 'Order',
        component: Order,
        props: (route) => ({ id: route.params.id }),
      },
      {
        path: 'OrderComplete',
        name: 'OrderComplete',
        component: OrderComplete,
      },
      {
        path: 'blog',
        name: 'Blog',
        component: Blog,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/admin/product',
        name: 'AdminProduct',
        component: AdminProduct,
      },
      {
        path: '/admin/order',
        name: 'AdminOrder',
        component: AdminOrder,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
