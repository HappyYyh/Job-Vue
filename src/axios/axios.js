import axios from 'axios'
import qs from "qs";
import { Message} from 'element-ui';


const service =axios.create({
    baseURL : 'http://localhost:8888',
    timeout : 5000,
    withCredentials:true,
})
//请求拦截器
service.interceptors.request.use(
    config =>{
        //请求为post序列化
        
        
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
        console.log(response.headers)
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
        console.log(error.response)
        Message({
            message:error.response.data.message,
            type:'error',
            duration:5*1000 
        })
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

export default {get,formPost,jsonPost};