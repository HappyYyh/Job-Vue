import axios from 'axios'
import qs from "qs";
import router from '../router';
import { Message} from 'element-ui';


const service =axios.create({
    baseURL : 'http://120.79.252.252:8888',
    timeout : 10000,
    withCredentials:true,
})
//请求拦截器
service.interceptors.request.use(
    config =>{
        let userInfo = localStorage.getItem('userInfo');
        if(userInfo!=null){
            var data  = JSON.parse(userInfo);
            if (new Date().getTime() - data.time > 15*24*60*60*1000) {
                console.log(userInfo+'已过期');
                localStorage.removeItem(userInfo);
                router.replace({
                    path:'login',
                    //登陆成功后跳回当前页面
                    query:{redirect: router.currentRoute.fullPath}
                })
            }else{
                var user = JSON.parse(data.user);
                //请求头中放入token
                config.headers={
                    'token':user.token
                }
            }
        }
        return config;
    },
    error =>{
        Message({
            message:error.message,
            type:'error',
            duration:5000 
        })
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use( 
    response =>{
        if(response.data.success === false) {
            //错误响应
            Message({
                message:response.data.message,
                type:'error',
            })
        }
        return response.data;
    },
    error=>{
        if(error.response.status === 401){
            Message({
                message:'请重新登陆',
                type:'warn',
            })
            router.replace({
                path:'/login',
                //登陆成功后跳回当前页面
                query:{redirect: router.currentRoute.fullPath}
            })
        }else{
            console.log(error.response)
            Message({
                message:error.response.data.message,
                type:'error',
                duration:5*1000 
            })
        }
        return Promise.reject(error)
    }
)

export function get(url,params){
    return new Promise((resolve,reject) =>{
        service({
            method:'get',
            url,
            params:params
        }).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

export function formPost(url,data){
    return new Promise((resolve,reject) =>{
        service({
            method:'post',
            url,
            data:qs.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
            }
        }).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

export function filePost(url,data){
    return new Promise((resolve,reject) =>{
        service({
            method:'post',
            url,
            data,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

export function jsonPost(url,data){
    return new Promise((resolve,reject) =>{
        service({
            method:'post',
            url,
            data:data,
            headers:{
                "Content-Type": "application/json;"
            }
        }).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

export default {get,formPost,filePost,jsonPost};