<template>
    <div>
        <el-row >
            <el-col :span="18" :offset="3">
                <!-- 头部信息 -->
                <el-card class="top" >
                    <div class="left">
                        <el-row class="status">{{jobDetail.job.status===0?'停止招聘':'招聘中'}}</el-row>
                        <el-row class="title">
                            <span class="name">
                                {{jobDetail.job.jobName}}
                            </span>
                            <span class="salary">
                                {{jobDetail.job.salaryStart}}K-{{jobDetail.job.salaryEnd}}K
                            </span>
                        </el-row>
                        <!-- 标签 -->
                        <el-row class="label">
                            {{jobDetail.job.workPlace}}
                            <em class="vline"></em>
                            <span>
                                <span v-for="(item,ind) in workExperience" :key="ind" v-show="item.value===jobDetail.job.workExperience">
                                    {{item.label}}
                                </span>
                            </span>
                            <em class="vline"></em>
                            <span>
                                <span v-for="(item,ind) in workEducation" :key="ind" v-show="item.value===jobDetail.job.workEducation">
                                    {{item.label}}
                                </span>
                            </span>
                        </el-row>
                        <el-row>
                            <el-tag class="welfare"  v-for="(item,ind) in jobWelfareList" :key="ind" v-show="ind<=7">{{item}}</el-tag>
                        </el-row>
                    </div>
                    <div class="right">
                        <div class="send">
                            <el-button class="sendbtn" v-show="isSend===0 && jobDetail.job.status===1" @click="jobSend(jobDetail.job.id)">简历投递</el-button>
                            <el-button class="notSend" v-show="isSend===1 || jobDetail.job.status===0" disabled>简历投递</el-button>
                        </div>
                        <div class="resume">
                            <a href="javascript:void(0)" @click="toMyResume" class="r1"><i class="el-icon-edit-outline"></i>填写在线简历</a>
                            <a href="javascript:void(0)" @click="toMyResume" class="r2"><i class="el-icon-upload2"></i>上传附件简历</a>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :offset="3">
                <!-- 详情 -->
               <el-row>
                   <el-col :span="15">
                       <!-- 职位信息 -->
                       <el-card class="job-detail" shadow="never">
                           <!-- 招聘者信息 -->
                           <el-row class="recruiter sub"> 
                                <el-col :span="3">
                                    <img :src="jobDetail.headImg">
                                </el-col>
                                <el-col :span="16" class="info">
                                    <el-row class="name">
                                        {{jobDetail.nickName===''?'匿名':jobDetail.nickName}}
                                    </el-row>
                                    <el-row>
                                        {{jobDetail.position}}
                                        <em class="vline"></em>
                                        <span>
                                        正在招聘中
                                        </span>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="sub"> 
                                <div class="title">
                                    发布时间:
                                </div>
                                <div class="content">
                                    {{jobDetail.createTime}}
                                </div>
                            </el-row>
                            <el-row class="sub"> 
                                <div class="title">
                                    工作职责:
                                </div>
                                <div class="content">
                                    <p v-for="(item,ind) in jobDutyList" :key="ind">
                                        {{item}}
                                    </p>
                                </div>
                            </el-row>
                            <el-row class="sub"> 
                                <div class="title">
                                    工作要求:
                                </div>
                                <div class="content">
                                    <p v-for="(item,ind) in jobRequirement" :key="ind">
                                        {{item}}
                                    </p>
                                </div>
                            </el-row>
                       </el-card>
                   </el-col>
                   <el-col :span="9">
                       <!-- 公司信息 -->
                       <el-card shadow="never" class="companyDetail">
                           <el-row class="primary">
                               <el-col :span="4">
                                   <img :src="jobDetail.company.img" >
                               </el-col>
                               <el-col :span="10" :offset="1" style="margin-top: 30px;">
                                   <span class="name">{{jobDetail.company.companyName}}</span>
                               </el-col>
                           </el-row>
                           <el-row class="primary">
                                <i class="el-icon-star-off"></i>
                                <span>{{jobDetail.company.registeredCapital}}万</span>
                           </el-row>
                           <el-row class="primary">
                                <i class="el-icon-location-outline" ></i>
                                <span>{{jobDetail.company.belongPlace}}</span>
                           </el-row>
                           <el-row class="primary">
                               <i class="el-icon-bell"></i>
                                    <span v-for="(it,ind) in industryCategory" :key="ind" v-show="it.value === jobDetail.company.industryCategory">
                                        {{it.name}}
                                    </span>
                           </el-row>
                           <el-row class="primary">
                                <i class="el-icon-plus"></i>
                                <span v-for="(it,ind) in staffNum" :key="ind" v-show="it.value === jobDetail.company.staffNum">
                                    {{it.name}}
                                </span>
                           </el-row>
                           <el-row class="primary">
                                <i class="el-icon-tickets"></i>
                                 <span v-for="(it,ind) in financingStatus" :key="ind" v-show="it.value === jobDetail.company.financingStatus">
                                    {{it.name}}
                                </span>
                           </el-row>
                           <el-row class="primary moreInfo">
                                <div class="title">
                                    工作要求:
                                </div>
                                <div class="content">
                                    <p>
                                        {{jobDetail.company.introduce}}
                                    </p>
                                </div>
                           </el-row>
                           <el-row class="primary moreInfo">
                                <div class="title">
                                    福利待遇:
                                </div>
                                <div class="content">
                                    <p v-for="(item,ind) in companyWelfareList" :key="ind" v-show="ind<10">
                                        {{item}}
                                    </p>
                                </div>
                           </el-row>
                       </el-card>
                   </el-col>
               </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/axios/api';
export default {
    data(){
        return{
            id:this.$route.params.jobId,
            jobId:null,
            jobDetail:{
                job:{},
                company:{},
            },
            jobWelfareList:[],
            companyWelfareList:[],
            industryCategory:[],
            financingStatus:[],
            workEducation:[],
            workExperience:[],
            staffNum:[],
            jobDutyList:[],
            jobRequirement:[],
            isSend:null,
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
            if(sessionStorage.getItem("jobId")===null){
                this.$message({
                    type:'error',
                    message:'职位详情查询失败,请重试!'
                })
                this.$router.push('/job/list');
            }else{
                this.jobId = sessionStorage.getItem("jobId");
            }
        }else{
            sessionStorage.setItem("jobId", this.id);
            this.jobId = this.id;
        }
    },
    mounted(){
        this.queryJobDetail();
        this.jobIsSend();
    },
    methods:{
        //查询详情
        queryJobDetail(){
            api.getJobDetail({id:this.jobId})
            .then(res=>{
                //标签处理
                if(res.data.welfares === null || res.data.welfares ===''){
                    this.companyWelfareList[0]="暂无福利标签";
                }else{
                    this.companyWelfareList = res.data.welfares.split("/")
                }
                if(res.data.job.welfare ===null || res.data.job.welfare ===''){
                    this.jobWelfareList[0]="暂无福利标签";
                }else{
                    this.jobWelfareList = res.data.job.welfare.split("/");
                }
                //文本处理
                this.jobDutyList = res.data.job.jobDuty.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                this.jobRequirement = res.data.job.jobRequirement.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                this.jobDetail = res.data
                console.log(this.jobDetail)
            })
        },
        //判断是否存在
        jobIsSend(){
            if(localStorage.getItem('userInfo') != null){
                let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
                api.isSend({
                    userId:userInfo.id,
                    jobId:this.jobId
                }).then(res=>{
                    this.isSend = res.data;
                    console.log(this.isSend)
                })
            }
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
                    if(res.code =='552'){
                        this.$router.push("/resume/resumeInfo")
                    }
                    if(res.success){
                        this.$notify({
                            title: '成功',
                            message: '简历投递成功',
                            type: 'success'
                        });
                        this.$router.push("/job/list")
                    }
                })
            }
        },
        toMyResume(){
            this.$router.push("/resume/resumeInfo")
        }
    }
}
</script>
<style lang="scss" scoped>
.clear{
    clear: both;
}
.vline {
    display: inline-block;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
}
.top{
    background-color: #F3F6FC;
    height: 200px;
}
.left{
    float: left;
    width: 55%;
    padding-left: 30px
}
.right{
    float: right;
    width: 40%;
    text-align: center;
}
.left .status{
    font-size: 14px;
    line-height: 20px;
}
.left .title{
    font-size: 32px;
    line-height: 45px;
    padding: 11px 0 8px;
}
.title .salary{
    color: #fa6a43;
    height: 42px;
    font-size: 30px;
    font-weight: 600;
    margin-left: 15px;
}
.left .label{
    font-size: 14px;
    color: #555
}
.left .welfare{
    margin-top: 15px;
    margin-right: 8px;
    border-radius: 13px;
}
.send{
    width: 60%;
    margin-left: 20%
}
.sendbtn{
    margin-top: 30px;
    width: 100%;
    border: 1px #5dd5c8 solid;
    font-size: 16px;
    color: #fff;
    letter-spacing: 1px;
    background: #5dd5c8;
}
.notSend{
    margin-top: 30px;
    width: 100%;
    font-size: 16px;
    letter-spacing: 1px;
}
.resume{
    margin-top: 40px;
    width: 60%;
    margin-left: 20%
}
.resume a{
    height: 22px;
    line-height: 22px;
    font-size: 16px;
    color: #555;
    text-decoration: underline;
}

.resume .r1{
    float: left;
}
.resume .r1 i{
    margin-right: 5px
}
.resume .r2{
    float: right;
}
.resume .r2 i{
    margin-left: 5px
}
.job-detail{
    padding-left: 30px;
    min-height: 700px;
    max-height: 1200px
}
.recruiter img{
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 100%;
}
.recruiter .info{
    height: 60px;
    font-size: 14px;
    font-weight: 200;
}
.recruiter .name{
    font-size: 20px;
    margin-top: 5px;
    font-weight: 600
}
.sub{
    border-bottom: 1px #f2f3f3 solid;
    padding-bottom: 30px;
    margin-top: 10px;
}
.sub .title{
    font-size: 16px;
    font-weight: 700;
    color: #333;
    line-height: 16px;
    margin-bottom: 22px;
    margin-top: 10px;
}
.sub .content{
    font-size: 14px;
}
.companyDetail{
    min-height: 700px;
    max-height: 1200px
}
.companyDetail img{
    display: block;
    width: 60px;
    height: 60px;
    border:1px rgb(226, 222, 181) solid
}
.companyDetail .name{
    font-size: 18px;
}
.companyDetail .primary{
    padding-left: 25px;
    margin-bottom: 10px;
    margin-top: 15px;
    font-size: 14px;
    color: #737373;
}
.primary span{
    margin-left: 10px;
}
.moreInfo{
    border-top: 1px #f2f3f3 solid;
    padding-top: 20px;
}
.moreInfo .title{
    color: #333;
    font-weight: 600;
}
</style>
