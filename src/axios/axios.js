import axios from 'axios'

const api =axios.create({
    withCredentials:true,
    baseURL:'http://regions.yangyhao.top',
    timeout:10000
})
export default api