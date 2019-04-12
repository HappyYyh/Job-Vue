import {get,jsonPost, filePost} from './axios.js'

/**
 * 地区
 */
const getAllRegions = ()=>{return get('regions/getAllRegions')}
const getAllProvince = ()=>{return get('regions/getAllProvince')}
const getCountrysByCityId = (cityId)=>{return get('regions/getCountrysByCityId',cityId)}
const getCitysByProvinceId = (provinceId) =>{return get('regions/getCitysByProvinceId',provinceId)}


/**
 * 用户
 */
const sendCheckCode = SendSmsRequest=>{return jsonPost('sendCheckCode',SendSmsRequest)}
const regist = registRequest=>{return jsonPost('register',registRequest)}
const login = loginRequest=>{return jsonPost('login',loginRequest)}
const logout = (token)=>{return get('logout',token)}

/**
 * 企业
 */
const companyCertificate = CommonCompanyRequest=>{return jsonPost('company/certificate',CommonCompanyRequest)}
const getCompanyInfoByRecruiterId = (recruiterId) =>{return get('company/info',recruiterId)}
const companyUpdate = UpdateCompanyRequest=>{return jsonPost('company/update',UpdateCompanyRequest)}

/**
 * 文件
 */
const fileUpload = (file)=>{return filePost('file/upload',file)}

/**
 * 职位分类
 */
const getAllCategory = ()=>{return get('jobCategory/getAllCategory')}

export default {
    getAllRegions,
    getAllProvince,
    getCountrysByCityId,
    getCitysByProvinceId,
    sendCheckCode,
    regist,
    login,
    logout,
    companyCertificate,
    getCompanyInfoByRecruiterId,
    companyUpdate,
    fileUpload,
    getAllCategory,
}
