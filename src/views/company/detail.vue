<template>
    <div>
        <el-row >
            <el-col :span="18" :offset="3">
                <el-card class="top" shadow="never">
                    <el-row>
                       <!-- 图片 -->
                        <el-col :span="4">
                            <img :src="companyDetail.img" class="img">
                        </el-col>
                        <el-col :span="19" :offset="1">
                             <!-- 名称 -->
                            <el-row class="name">{{companyDetail.companyName}}</el-row>
                             <!-- 标签 -->
                            <el-row style="margin-top:10px">
                                <p class="label">
                                    <span>  
                                        <span v-for="(it,ind) in financingStatus" :key="ind" v-show="it.value === companyDetail.financingStatus">
                                            {{it.name}}
                                        </span>
                                    </span>
                                    <em class="vline"></em>
                                        <span v-for="(it,ind) in staffNum" :key="ind" v-show="it.value === companyDetail.staffNum">
                                            {{it.name}}
                                        </span>
                                    <em class="vline"></em>
                                     <span>
                                        <span v-for="(it,ind) in industryCategory" :key="ind" v-show="it.value === companyDetail.industryCategory">
                                            {{it.name}}
                                        </span>
                                    </span>
                                </p>
                            </el-row>
                            <!-- 福利标签 -->
                            <el-row>
                                <el-col style="margin-top:15px">
                                    <el-tag class="welfare"  v-for="(item,ind) in welfareList" :key="ind" v-show="ind<=7">{{item}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="18" :offset="3" style="margin-top: 20px;">
                <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                    <!-- 公司详情 -->
                    <el-tab-pane label="公司详情" name="detail" class="detail">
                        <!-- 左侧基本信息 -->
                        <div class="companyInfo">
                            <p>
                                <i class="el-icon-star-off" style="margin-right:3px"></i>注册资金:
                                <span>{{companyDetail.registeredCapital}}万</span>
                            </p>
                            <p>
                                <i class="el-icon-location-outline" style="margin-right:3px"></i>所处地区:
                                <span>{{companyDetail.belongPlace}}</span>
                            </p>
                            <p>
                                <el-col :span="3.5">
                                    <i class="el-icon-document" style="margin-right:3px"></i>公司简介:
                                </el-col>
                                <el-col :span="18">
                                    <span style="margin-left: 5px;">{{companyDetail.introduce}}</span>
                                </el-col>
                                
                            </p>
                        </div>
                        <!-- 右侧招聘者信息 -->
                        <div class="recruiterInfo">
                            <el-row class="primary" v-for="(recruiter,ind) in companyDetail.recruiterResponseList" :key="ind"> 
                                <el-col :span="4">
                                    <img :src="recruiter.headImg">
                                </el-col>
                                <el-col :span="16">
                                    <el-row>
                                        {{recruiter.nickName===''?'匿名':recruiter.nickName}}
                                        <em class="vline"></em>
                                        {{recruiter.position}}
                                    </el-row>
                                    <el-row>
                                        <span>
                                        正在招聘中
                                        </span>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>
                    <!-- 在招职位 -->
                    <el-tab-pane label="在招职位" name="job" class="jobList">
                        <!-- 结果展示 -->
                        <div class="result">
                            <div class="job-primary clear" v-for="(job,index) in jobList" :key="index">
                                <div class="info">
                                    <div class="clear">
                                        <a href="javascript:void(0)" @click="toJobDetail(job.id)">
                                            <div class="name">
                                                <a href="javascript:void(0);">{{job.jobName}} [ {{job.workPlace}} ]</a>
                                            </div>
                                            <div class="salary">
                                                {{job.salaryStart}}k - {{job.salaryEnd}}k
                                            </div>
                                        </a>
                                    </div>
                                    <div class="clear">
                                        <div class="label">
                                            <span>
                                                <span v-for="(item,ind) in workExperience" :key="ind" v-show="item.value===job.workExperience">
                                                    {{item.label}}
                                                </span>
                                            </span>
                                            <em class="vline"></em>
                                            <span>
                                                <span v-for="(item,ind) in workEducation" :key="ind" v-show="item.value===job.workEducation">
                                                    {{item.label}}
                                                </span>
                                            </span>
                                        </div>
                                        <div class="time">
                                            <!-- 这里说明一点，为了减少新建一个bean，后端返回时间，把时间字段填写在jobDuty字段上面 -->
                                            {{job.jobDuty}}发布
                                        </div>
                                    </div>
                                </div>
                                <div class="button">
                                    <el-button @click="jobSend(job.id)">简历投递</el-button>
                                </div>
                            </div>
                        </div>
                        <!-- 分页 -->
                        <div class="pagination">
                            <el-pagination 
                                @current-change="handleCurrentChange"
                                :current-page.sync="pageNo"
                                :page-size="pageSize"
                                layout="prev, pager, next,total"
                                :total="total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/axios/api';
export default {
    data(){
        return{
            id:this.$route.params.companyId,
            companyId:null,
            companyDetail:{},
            welfareList:[],
            industryCategory:[],
            financingStatus:[],
            workEducation:[],
            workExperience:[],
            staffNum:[],
            activeName:'detail',
            jobList:[],
            pageSize:5,//每页的数据条数
            pageNo:1,//默认开始页面
            total:null,//总记录数
        }
    },
    created(){
        this.industryCategory = this.$store.state.industryCategory;
        this.financingStatus = this.$store.state.financingStatus;
        this.staffNum = this.$store.state.staffNum;
        this.workEducation = this.$store.state.workEducation;
        this.workExperience = this.$store.state.workExperience;
        if(this.id === undefined || this.id === null){
            //如果非点击跳转进入判断是否有sessionStorage
            if(sessionStorage.getItem("companyId")===null){
                this.$message({
                    type:'error',
                    message:'企业详情查询失败,请重试!'
                })
                this.$router.push('/company/list');
            }else{
                this.companyId = sessionStorage.getItem("companyId");
            }
        }else{
            sessionStorage.setItem("companyId", this.id);
            this.companyId = this.id;
        }
    },
    mounted(){
        this.queryCompanyDetail();
    },
    methods:{
        //查询基本信息
        queryCompanyDetail(){
            api.queryCompanyDetail({id:this.companyId})
            .then(res=>{
                if(res.data.welfares === null || res.data.welfares ===''){
                    this.welfareList[0]="暂无福利标签";
                }else{
                    this.welfareList = res.data.welfares.split("/")
                }
                console.log(res)
                this.companyDetail = res.data
            })
        },
        //查询公司下职位
        queryCompanyJobList(){
            api.getCompanyJobs({
                companyId:this.companyId,
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }).then(res=>{
                this.total = res.data.total;
                this.jobList = res.data.list;
                console.log(this.jobList)
            })
        },
        handleCurrentChange(val){
            this.pageNo = val;
            this.queryCompanyJobList();
        },
        // eslint-disable-next-line no-unused-vars
        handleClick(tab, event) {
            this.queryCompanyJobList();
        },
        //跳转到职位详情
        toJobDetail(jobId){
            this.$router.push({
                name:'jobDetail',
                params:{
                    jobId
                }
            })
        },
        //职位投递
        jobSend(jobId){
            if(localStorage.getItem('userInfo') === null){
                this.$message({
                    type:'warning',
                    message:'请先登陆再操作'
                })
                //未登陆则先登陆
                this.$router.replace({
                    path:'/login',
                    //登陆成功后跳回当前页面
                    query:{redirect: this.$router.currentRoute.fullPath}
                })
            }else{
                let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
                api.addJobSend({
                    userId:userInfo.id,
                    jobId
                }).then(res=>{
                    if(res.success){
                        this.$notify({
                            title: '成功',
                            message: '简历投递成功',
                            type: 'success'
                        });
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.clear{
    clear: both;
}
.top{
    margin-top: 30px;
}
.top .img{
    width: 164px;
    height: 164px;
    border-right: 1px solid #eaeaea;
}
.vline {
    display: inline-block;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
}
.name{
    font-size: 20px;
    font-weight: 400;
}
.label{
    font-size: 14px;
}
.welfare{
    min-width: 80px;
    text-align: center;
    // margin-right: 6px;
}
.el-tabs__header{
    margin: 0;
}
.companyInfo{
    float: left;
    width: 59.9%;
    border-right: 1px #f5f7f9 solid;
    font-size: 14px;
    min-height: 300px;
}
.companyInfo p{
    margin-left: 20px;
    line-height: 36px;
}
.companyInfo p span{
    color: #61687c;
}
.recruiterInfo{
    float: right;
    width: 38%;
    font-size: 14px;
    padding-left: 20px;
}
.recruiterInfo .primary{
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px #f5f7f9 solid;
}
.recruiterInfo img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
}
.recruiterInfo span{
    color: #61687c;
    font-size: 12px;
}
.job-primary{
    height: 50px;
    padding: 15px 16px;
    margin-bottom: 20px;
    border: 1px solid #ededed;
    font-size: 14px;
    // width: 60%
}
.job-primary .info{
    width: 60%;
    float: left;
}
.job-primary .button{
    width: 40%;
    float: right;
    text-align: center;
}
.job-primary .name{
    float: left;
    width: 50%;
    font-size: 16px;
    color: #333;
    font-weight: 700;
}
.job-primary .salary{
    float: right;
    width: 50%;
    font-size: 16px;
    color: #FD5F39;
    font-weight: 700;
    text-align: center;
}
.job-primary .label{
    float: left;
    width: 50%;
    font-size: 14px;
    margin-top: 5px;
    color: #A1A1A1;
}
.job-primary .time{
    float: right;
    width: 50%;
    font-size: 14px;
    margin-top: 5px;
    color: #A1A1A1;
    text-align: center;
}
.result{
    height: 490px;
}
.pagination{
    text-align: center;
    margin-top: 20px;
}
</style>
