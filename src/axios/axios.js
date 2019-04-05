import axios from 'axios'
import qs from "qs";
import { Message } from 'element-ui';


const service =axios.create({
    baseURL : 'http://192.168.0.104:8888',
    timeout : 10000,
    withCredentials:true,
})
//请求拦截器
service.interceptors.request.use(
    config =>{
        //请求为post转为json
        if(config.method === 'post'){
            config.data = qs.stringify({...config.data})
            config.headers = {
                'Content-Type':'application/json'
            }
        }else if (config.method === 'get'){
            config.params = {...config.params};
            config.headers = {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
        // config.method === 'post'
        // ? config.data = qs.stringify({...config.data})
        // : config.params = {...config.params};
        // config.headers = {
        //     'Content-Type':'application/x-www-form-urlencoded'
        // }
        return config;
    },
    error =>{
        Message({
            Message:error.message,
            type:'error',
            duration:5000 
        })
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use( 
    response =>{
        console.log(response.headers)
        if(response.data.success === true) {
            //请求成功
            return response.data;
        } else{
            //错误响应
            Message({
                Message:response.data.message,
                type:'error',
                duration:5000 
            })
        }
    },
    // error=>{

    // }
)

export function get(url,params){
    return new Promise((resolve,reject) =>{
        service({
            method:'get',
            url,
            params:params
        }).then(res =>{
            console.log(params)
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

export function post(url,params){
    return new Promise((resolve,reject) =>{
        service({
            method:'post',
            url,
            data:params
        }).then(res =>{
            console.log(params)
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

export default {get,post};