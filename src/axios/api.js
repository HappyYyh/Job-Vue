import {get,jsonPost} from './axios.js'

/**
 * 地区
 */
const getAllProvince = ()=>{return get('regions/getAllProvince')}
const getCountrysByCityId = (cityId)=>{return get('regions/getCountrysByCityId',cityId)}
const getCitysByProvinceId = (provinceId) =>{return get('regions/getCitysByProvinceId',provinceId)}

/**
 * 用户
 */
const sendCheckCode = SendSmsRequest=>{return jsonPost('sendCheckCode',SendSmsRequest)}
const regist = registRequest=>{return jsonPost('register',registRequest)}
const login = loginRequest=>{return jsonPost('login',loginRequest)}

/**
 * 职位分类
 */
const getAllCategory = ()=>{return get('jobCategory/getAllCategory')}

export default {
    getAllProvince,
    getCountrysByCityId,
    getCitysByProvinceId,
    sendCheckCode,
    regist,
    login,
    getAllCategory,
}
