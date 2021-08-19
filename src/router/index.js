import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/device',
    name: 'Device',
    component: () => import('@/views/Device.vue')
  },
  {
    path: '/simulate',
    name: 'Simulate',
    component: () => import('@/views/Simulate.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
