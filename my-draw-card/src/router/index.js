import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import First from '../views/First.vue';



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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router