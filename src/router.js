import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'home',
      component: () => import('./views/home.vue'),
      redirect:'index',
      children:[
        {
          path:'/index',
          name:'index',
          component: () => import('./views/index.vue')
        },
        {
          path:'/test',
          name:'test',
          component: () => import('./views/test.vue')
        },
        {
          path:'/recruiter/firstLogin',
          name:'recruiterFirstLogin',
          component: () => import('./views/recruiterFirstLogin.vue')
        },
        {
          path:'/company/certificate',
          name:'certificateCompany',
          component: () => import('./views/certificateCompany.vue')
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('./views/login.vue')
    },
    {
      path:'/regist',
      name:'regist',
      component: () => import('./views/regist.vue')
    },
    
  ]
})
