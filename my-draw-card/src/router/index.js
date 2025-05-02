import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import First from '../views/First.vue';
import Town from '../views/Town.vue';



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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router