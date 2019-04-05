import {get} from './axios.js'

export const getAllProvince = ()=>{return get('regions/getAllProvince')}
export const getCountrysByCityId = (cityId)=>{return get('regions/getCountrysByCityId',cityId)}
export const getCitysByProvinceId = (provinceId) =>{return get('regions/getCitysByProvinceId',provinceId)}


