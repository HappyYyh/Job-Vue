<template>
    <div>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-card shadow="never">
                    <div v-show="!leftShow" class="notShow">
                        暂无求职者投递
                    </div>
                    <!-- 左侧 -->
                    <div class="left">
                        <el-collapse v-show="leftShow" v-model="activeNames" @change="handleChange">
                            <el-collapse-item class="item" v-for="(item,ind) in RecruiterGotList" :key="ind" :name="ind">
                                <template slot="title">
                                     <span class="name">{{item.jobName}} </span>
                                     <span class="salary" v-show="item.salaryStart !==null && item.salaryEnd!=null">[{{item.salaryStart}}K-{{item.salaryEnd}}K] </span>
                                </template>
                                <div class="seeker" :class="{select:firstSelected===ind && secondSelected===index}" v-for="(it,index) in item.seekerInfoResponseList" :key="index">
                                    <el-row>
                                        <el-col :span="12" class="userName">
                                        {{it.userName}} 
                                        <i class="el-icon-mobile-phone"></i>
                                        {{it.phone}}
                                    </el-col>
                                    <el-col :span="6" :offset="6">
                                        <a href="javascript:void(0)" class="queryResume" @click="getResume(ind,index,it.userId,item.jobId)">查看简历</a>
                                    </el-col>
                                    </el-row>
                                    
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <!-- 右侧 -->
                    <div class="right">
                        <div v-show="leftShow" class="confirm">
                                <el-button  @click="confirm(2)" type="primary">邀请面试</el-button>
                                <el-button  @click="confirm(3)" type="danger">尚不合适</el-button>
                        </div>
                        <div class="container" id="pdfDom"  v-show="leftShow">
                            <!-- 基础信息 -->
                            <div class="basis">
                                <img :src="baseShow.headImg" class="basis-img" alt="">
                                <span class="name">{{baseShow.name}}</span>
                                <p>
                                    {{baseShow.birthDay}}
                                    <span class="devide">|</span>
                                    {{baseShow.sex===0?'男':'女'}}
                                    <span class="devide">|</span>
                                    {{baseShow.city}}
                                </p>
                                <p>
                                    {{baseShow.phone}}
                                    <span class="devide">|</span>
                                    {{baseShow.email}}
                                </p>
                            </div>
                            <!-- 简介 -->
                            <div class="clear sec">
                                <h3 class="sec-title">个人简介</h3>
                                <p class="sec-content">{{baseShow.introduce}}</p>
                            </div>
                            <!-- 求职期望 -->
                            <div class="clear sec expect-pos">
                                <h3 class="sec-title">求职期望</h3>
                                <div class="pos-slted">
                                    {{baseShow.expJob}}
                                    <span class="devide">|</span>
                                    {{baseShow.expJobType===0?'全职':baseShow.expJobType===1?'兼职':'实习'}}
                                    <span class="devide">|</span>
                                    {{baseShow.expCity}}
                                    <span class="devide">|</span>
                                    {{baseShow.expStartSalary}}K-{{baseShow.expEndSalary}}K
                                    <span class="devide">|</span>
                                    {{baseShow.expNowStatus===0?'积极找工作':baseShow.expNowStatus===1?'随便看看':'暂时不换工作'}}
                                    <span class="devide">|</span>
                                    {{baseShow.expComeTime===0?'随时到岗':baseShow.expComeTime===1?'两周以内':baseShow.expComeTime===2?'两周到一个月':baseShow.expComeTime===3?'一到三个月':'三个月以上'}}
                                </div>
                            </div>
                            <!-- 教育经历 -->
                            <div class="sec">
                                <h3 class="sec-title">教育经历</h3>
                                <div class="sec-content" v-for="(item,ind) in resumeEducationResponseList" :key="ind">
                                    <span class="from">{{item.universityName}}</span>
                                    <div class="major">
                                        <span class="time">{{item.startYear}}-{{item.endYear}}</span>
                                        {{item.professionalName}}
                                        <span class="devide">|</span>
                                        {{item.education===0?'大专':item.education===1?'本科':item.education===2?'硕士':'博士'}}
                                    </div>
                                </div>
                            </div>
                            <!-- 工作经历 -->
                            <div class="sec">
                                <h3 class="sec-title">工作经历</h3>
                                <div class="sec-content" v-for="(item,ind) in resumeExperienceResponseList" :key="ind">
                                    <span class="from">{{item.companyName}}</span>
                                    <div class="major">
                                        <span class="time">{{item.startTime}}-{{item.endTime}}</span>
                                        {{item.department}}
                                        <span class="devide">|</span>
                                        {{item.position}}
                                        <span class="devide">|</span>
                                        {{item.job}}
                                    </div>
                                    <div>
                                        <p class="detail" v-for="(detail,ind) in item.detailList" :key="ind">{{detail}}</p>
                                        <!-- <span style="margin-left:20px">
                                            {{item.detail}}
                                        </span> -->
                                    </div>
                                </div>
                            </div>
                            <!-- 项目经历 -->
                            <div class="sec">
                                <h3 class="sec-title">项目经历</h3>
                                <div class="sec-content" v-for="(item,ind) in resumeProjectResponseList" :key="ind">
                                    <span class="from">{{item.projectName}}</span>
                                    <div class="major">
                                        <span class="time">{{item.startTime}}-{{item.endTime}}</span>
                                    </div>
                                    <div>
                                        <div>
                                            <p class="detail" v-for="(description,ind) in item.descriptionList" :key="ind">{{description}}</p>
                                        </div>
                                        <div>
                                            <p class="detail" v-for="(result,ind) in item.resultList" :key="ind">{{result}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="download">
                            <el-button type="primary" @click="getPdf()">下载</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/axios/api';
export default {
    data(){
        return{
            recruiterId:null,
            RecruiterGotList:[],
            activeNames:0,
            leftShow:false,
            firstSelected:null,
            secondSelected:null,
            chooseJobId:null,
            chooseUserId:null,
            baseShow:{},
            resumeEducationResponseList:[],
            resumeExperienceResponseList:[{detailList:[]}],
            resumeProjectResponseList:[{descriptionList:[],resultList:[]}],
            htmlTitle:''
        }
    },
    created(){
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
            this.recruiterId = userInfo.id
        }
    },
    mounted(){
        this.queryRecruiterGodList();
    },
    methods:{
        queryRecruiterGodList(){
            api.recruiterGotList({recruiterId:this.recruiterId})
            .then(res=>{
                if(res.data.length!=0){
                    let firstUserId = res.data[0].seekerInfoResponseList[0].userId;
                    let firstJobId = res.data[0].jobId;
                    this.getResume(0,0,firstUserId,firstJobId);
                    this.RecruiterGotList = res.data
                    this.leftShow = true;
                    this.chooseJobId = firstJobId;
                    this.chooseUserId = firstUserId;
                }
            })
        },
        handleChange(val) {
            console.log(val);
        },
        getResume(ind,index,userId,jobId){
            //改变选择样式
            this.firstSelected = ind;
            this.secondSelected = index;
            //选择的值
            this.chooseJobId = jobId;
            this.chooseUserId = userId;
            api.recruiterGetResume({
                userId,
                jobId
            }).then(res=>{
                console.log(res)
                //信息展示
                this.baseShow = res.data.resumeBaseResponse;
                this.resumeEducationResponseList = res.data.resumeEducationResponseList; 
                this.resumeExperienceResponseList = res.data.resumeExperienceResponseList;
                this.resumeProjectResponseList = res.data.resumeProjectResponseList;
                //将文本分割换行
                this.resumeExperienceResponseList.forEach((item)=>{
                    if(item.detail!==null){
                        item.detailList = item.detail.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                    }
                })
                this.resumeProjectResponseList.forEach((item)=>{
                    if(item.description!==null){
                        item.descriptionList = item.description.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                    }
                    if(item.result!==null){
                        item.resultList = item.result.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                    }
                })
                this.htmlTitle = this.baseShow.name+'的简历'
            })
        },
        confirm(type){
            api.updateSendStatus({
                jobId:this.chooseJobId,
                userId:this.chooseUserId,
                type
            }).then(res=>{
                if(res.success){
                    window.location.href = "/recruiter/jobSend";
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.notShow{
    text-align: center;
    margin-top: 30px;
    font-size: 18px;
}
.confirm{
    text-align: center;
}
.left{
    float: left;
    width: 30%;
    min-height: 600px;
    border-right: 1px #f5f7f9 solid;
}

.select{
    background-color: #f2f6fb;
    border: 1px #87d6c4 solid;
}

.name{
    font-size: 16px;
    color: #0d9572;
}
.salary{
    font-size: 14px;
    color: #e6775c;
    margin-left: 20px;
}
.seeker{
     padding:5px 0 5px 30px ;
}
.phone{
    color: #999;
}
.queryResume{
    color: teal;
}
.right{
    float: right;
    width: 69.8%;
    min-height: 600px;
}
//右侧简历展示
.container{
    // background-color: rgb(255, 255, 255);
    // min-height: 100%;
    padding: 45px 50px;
}
.basis{
    padding-bottom: 28px;
}
.basis-img{
    float: right;
    width: 80px;
    height: 80px;
    background-color: rgb(247, 247, 247);
    border-radius: 50%;
}
.basis p{
    font-size: 12px;
    line-height: 30px;
    margin-right: 100px;
}
.basis .name{
    font-size: 25px;
    line-height: 25px;
    color: rgb(32, 35, 41);
    margin-bottom: 19px;
}
.devide{
    color: rgb(185, 185, 185);
    font-size: 13px;
    margin: 0px 15px;
}
.sec{
    margin-bottom: 31px;
}
.sec p {
    font-size: 12px;
    line-height: 25px;
    color: rgb(141, 146, 161);
}
.expect-pos {
    font-size: 12px;
}
.expect-pos .pos-slted {
    line-height: 18px;
    padding-top: 2px;
}
.sec-title::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 3px;
    height: 100%;
    background-color: rgb(83, 202, 195);
}
.sec .sec-title{
    position: relative;
    font-size: 17px;
    line-height: 17px;
    color: rgb(32, 35, 41);
    font-weight: 400;
    padding-left: 13px;
}
.sec .sec-content {
    padding-left: 13px;
    margin-top: 14px;
}
.sec .from {
    display: inline-block;
    font-size: 14px;
    line-height: 21px;
}
.sec .major {
    font-size: 13px;
    line-height: 20px;
    margin: 10px 0px 9px;
}
.sec .time {
    font-size: 11px;
    color: rgb(141, 146, 161);
    float: right;
    margin-left: 10px;
}
.download{
    text-align: center
}

</style>
