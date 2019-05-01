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
          // 路由守卫
          meta: { requireAuth: true ,role:1 },
          component: () => import('./views/recruiter/recruiterFirstLogin.vue')
        },
        {
          path:'/recruiter/jobSend',
          name:'recruiterGodSendList',
          // 路由守卫
          meta: { requireAuth: true,role:1 },
          component: () => import('./views/recruiter/jobSend')
        },
        {
          path:'/company/certificate',
          name:'certificateCompany',
          // 路由守卫
          meta: { requireAuth: true ,role:1 },
          component: () => import('./views/company/certificateCompany.vue')
        },
        {
          path:'/company/info',
          name:'companyInfo',
          component: () => import('./views/company/Info.vue')
        },
        {
          path:'/company/list',
          name:'companyInfoList',
          component: () => import('./views/company/list.vue')
        },
        {
          path:'/company/detail',
          name:'companyDetail',
          component: () => import('./views/company/detail.vue')
        },
        {
          path:'/job/addJob',
          name:'addJob',
          // 路由守卫
          meta: { requireAuth: true,role:1  },
          component: () => import('./views/job/addJob.vue')
        },
        {
          path:'/job/recruitersJob',
          name:'recruitersJob',
          // 路由守卫
          meta: { requireAuth: true ,role:1 },
          component: () => import('./views/job/recruitersJob.vue')
        },
        {
          path:'/job/list',
          name:'jobInfoList',
          component: () => import('./views/job/list.vue')
        },
        {
          path:'/job/detail',
          name:'jobDetail',
          component: () => import('./views/job/detail.vue')
        },
        {
          path:'/resume/resumeInfo',
          name:'resumeInfo',
          // 路由守卫
          meta: { requireAuth: true ,role:0 },
          component: () => import('./views/resume/resumeInfo.vue')
        },
        {
          path:'/seeker/jobSend',
          name:'seekerJobSendRecord',
          // 路由守卫
          meta: { requireAuth: true ,role:0 },
          component: () => import('./views/seeker/jobSend')
        },
        {
          path:'/seeker/jobSubScribe',
          name:'JobSubScribe',
          // 路由守卫
          meta: { requireAuth: true ,role:0 },
          component: () => import('./views/seeker/jobSubScribe')
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
