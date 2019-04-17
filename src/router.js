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
      component: () => import('./views/Home.vue'),
      redirect:'index',
      children:[
        {
          path:'/index',
          name:'index',
          component: () => import('./views/index.vue')
        },
        {
          path:'/recruiter/firstLogin',
          name:'recruiterFirstLogin',
          component: () => import('./views/recruiter/recruiterFirstLogin.vue')
        },
        {
          path:'/company/certificate',
          name:'certificateCompany',
          component: () => import('./views/company/certificateCompany.vue')
        },
        {
          path:'/company/info',
          name:'info',
          component: () => import('./views/company/Info.vue')
        },
        {
          path:'/job/addJob',
          name:'addJob',
          component: () => import('./views/job/addJob.vue')
        },
        {
          path:'/job/recruitersJob',
          name:'recruitersJob',
          component: () => import('./views/job/recruitersJob.vue')
        },
        {
          path:'/resume/addResume',
          name:'addResume',
          component: () => import('./views/resume/addResume.vue')
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
