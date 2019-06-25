import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('@/views/MainPage')
    },
    {
      path: '/app',
      name: 'Home',
      component: () => import('@/views/Home'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard')
        },
        {
          path: 'market/:currency',
          name: 'Market',
          component: () => import('@/views/Market')
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('@/views/History')
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/About')
        }
      ]
    },
    {
      path: '/404',
      name: 'NotFound', 
      component: () => import('@/views/NotFound') 
    },
    {
      path: '*', 
      redirect: '/404' 
    }
  ]
})
