import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import First from '../views/First.vue';
import Town from '../views/Town.vue';
import product from '../views/product.vue';



const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld  
  },
  {
    path: '/first',
    name: 'First',
    component: First,
  },
  {
    path: '/town',
    name: 'Town',
    component: Town,
  },
  {
    path: '/product',
    name: 'product',
    component: product,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router