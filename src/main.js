import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import htmlToPdf from '@/components/utils/htmlToPdf'
import { Message } from 'element-ui';

import api from './axios/axios.js'

Vue.prototype.$axios = axios
Vue.prototype.$api=api;
Vue.use(htmlToPdf)

Vue.config.productionTip = false

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  if (to.meta.requireAuth) {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
      if(to.meta.role!=undefined){
        //如果需要验证身份
        if(userInfo.role ===to.meta.role){
            next();
        }else{
          Message({
            type:'warning',
            message:'暂无权限'
          })
          next({
            path: from.fullPath
          })
        }
      }else{
        next();
      }
    } else {
      Message({
        type:'warning',
        message:'请先登陆再操作'
      })
      next({
        path: "/login",//指向为你的登录界面
        query:{redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
  //已经登陆后则不需要进入登陆页面
  if (to.fullPath === "/login") {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
