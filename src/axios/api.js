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
const userUpdate = (updateUserRequest)=>{return jsonPost('user/updateInfo',updateUserRequest)}

/**
 * 企业
 */
const companyCertificate = CommonCompanyRequest=>{return jsonPost('company/certificate',CommonCompanyRequest)}
const getCompanyInfoByRecruiterId = (recruiterId) =>{return get('company/info',recruiterId)}
const companyUpdate = UpdateCompanyRequest=>{return jsonPost('company/update',UpdateCompanyRequest)}
const getAllCompanyName = ()=>{return get('company/getAllCompanyName')}
const queryCompany = QueryCompanyRequest =>{return jsonPost('company/query',QueryCompanyRequest)}

/**
 * 招聘者
 */
const bindCompany = BindCompanyRequest =>{return jsonPost('recruiter/bindCompany',BindCompanyRequest)}
const getRecruiters = RecruiterListRequest =>{return jsonPost('recruiter/getRecruiters',RecruiterListRequest)}
const updateRecruiterInfo = CommonRecruiterRequest =>{return jsonPost('recruiter/updateRecruiterInfo',CommonRecruiterRequest)}

/**
 * 职位
 */
const addJob = addJobRequest =>{return jsonPost('job/add',addJobRequest)}
const recruitersJobList = QueryJobRequest =>{return jsonPost('job/getJobList',QueryJobRequest)}
const getJobDetail = (id) =>{return get('job/detail',id)}
const updateJob = updateJobRequest =>{return jsonPost('job/update',updateJobRequest)}
const queryJob = QueryJobRequest =>{return jsonPost('job/list',QueryJobRequest)}

/**
 * 简历
 */
const submitBase = (ResumeBaseRequest) =>{return jsonPost('resume/submitBase',ResumeBaseRequest)}
const submitEducation = (ResumeEducationRequest) =>{return jsonPost('resume/submitEducation',ResumeEducationRequest)}
const submitExperience = (ResumeExperienceRequest) =>{return jsonPost('resume/submitExperience',ResumeExperienceRequest)}
const submitProject = (ResumeProjectRequest) =>{return jsonPost('resume/submitProject',ResumeProjectRequest)}
const deleteResume = (ResumeDeleteRequest) =>{return jsonPost('resume/deleteResume',ResumeDeleteRequest)}
const myResume = (userId) =>{return get('resume/getResume',userId)}

/**
 * 文件
 */
const fileUpload = (file)=>{return filePost('file/upload',file)}
const fileDelete = (key)=>{return get('file/delete',key)}

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
    userUpdate,
    companyCertificate,
    getCompanyInfoByRecruiterId,
    companyUpdate,
    getAllCompanyName,
    queryCompany,
    bindCompany,
    getRecruiters,
    updateRecruiterInfo,
    addJob,
    recruitersJobList,
    getJobDetail,
    submitBase,
    submitEducation, 
    submitExperience,
    submitProject,
    deleteResume,
    myResume,
    updateJob,
    queryJob,
    fileUpload,
    fileDelete,
    getAllCategory,
}
