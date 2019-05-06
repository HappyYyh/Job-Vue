<template>
    <div>
        <el-row>
            <!-- 输入框搜索 -->
            <el-col :span="16" :offset="4">
                <el-row>
                    <el-col :span="6">
                        <el-cascader style="width:100%" :options="options" :props="props" v-model="selectedOptions" @change="handleCategoryChange" placeholder="请选择职位分类"></el-cascader>
                    </el-col>
                    <el-col :span="18">
                        <el-input placeholder="搜索职位名称" clearable v-model="query.jobName">
                            <el-button slot="append" style="border-right: 1px solid #c0c4cc;border-radius: 0;" icon="el-icon-search" @click="queryJob(null,null,null)">搜索</el-button>
                            <el-button slot="append" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 过滤条件 -->
            <el-col :span="16" :offset="4">
                <el-card class="filter">
                    <el-row class="filter-row">
                        <el-col :span="2">工作城市:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:CityAcitve===''}" @click="queryJob('',null,0)">全国</a>
                            <a href="javascript:void(0)" :class="{selected:CityAcitve===ind}" v-for="(item,ind) in hotCity" :key="ind" @click="queryJob(ind,item,0)">{{item}}</a>
                            <a href="javascript:void(0)" :class="{selected:CityAcitve==='more'}" class="findMore">查看更多</a>
                            <input v-show="false" v-model="query.city"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">工作经验:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:workExperiencenActive===null}" @click="queryJob(null,null,2)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:workExperiencenActive===ind}" v-for="(item,ind) in workExperience" :key="ind" @click="queryJob(ind,item.value,2)">{{item.label}}</a>
                            <input v-show="false" v-model="query.workExperience"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">学历要求:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:workEducationActive===null}" @click="queryJob(null,null,3)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:workEducationActive===ind}" v-for="(item,ind) in workEducation" :key="ind" @click="queryJob(ind,item.value,3)">{{item.label}}</a>
                            <input v-show="false" v-model="query.workEducation"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">融资阶段:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:financingStatusAcitve===null}" @click="queryJob(null,null,4)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:financingStatusAcitve===ind}" v-for="(item,ind) in financingStatus" :key="ind" @click="queryJob(ind,item.value,4)">{{item.name}}</a>
                            <input v-show="false" v-model="query.financingStatus"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">公司规模:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:staffNumAcitve===null}" @click="queryJob(null,null,5)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:staffNumAcitve===ind}" v-for="(item,ind) in staffNum" :key="ind" @click="queryJob(ind,item.value,5)">{{item.name}}</a>
                            <input v-show="false" v-model="query.staffNum"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">行业类型:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:industryCategoryAcitve===null}" @click="queryJob(null,null,6)">不限</a>
                            <span>
                                <a href="javascript:void(0)" :class="{selected:industryCategoryAcitve===ind}" v-for="(item,ind) in industryCategory" :key="ind" v-show="ind<9"  @click="queryJob(ind,item.value,6)">{{item.name}}</a>
                            </span>
                            <span>
                                <a href="javascript:void(0)" :class="{selected:industryCategoryAcitve===ind}" v-for="(item,ind) in industryCategory" :key="ind" v-show="showMore && ind>=9" @click="queryJob(ind,item.value,6)">{{item.name}}</a>
                            </span>
                            <a href="javascript:void(0)" :class="{selected:industryCategoryAcitve==='more'}" class="findMore" @click="showMore = !showMore">{{showMore===false?'查看更多':'收起'}}</a>
                            <input v-show="false" v-model="query.industryCategory"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">薪资范围:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:salaryActive===null}" @click="querySalary(null,null,null)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:salaryActive===ind}" v-for="(item,ind) in salary" :key="ind" @click="querySalary(ind,item.start,item.end)">{{item.start}}k-{{item.end}}k</a>
                            <a href="javascript:void(0)" :class="{selected:salaryActive===999}" @click="querySalary(999,50,999)">50k以上</a>
                            <input v-show="false" v-model="query.salaryStart"/>
                            <input v-show="false" v-model="query.salaryEnd"/>
                        </el-col>
                    </el-row>
                </el-card>    
            </el-col>

            <!-- 结果 -->
            <el-col :span="16" :offset="4" style="margin-top:15px">
                <el-card class="jobList">
                    <div v-for="(item,index) in jobList" :key="index" class="job-primary">
                        <!-- 职位信息 -->
                        <el-col :span="9" class="jobInfo">
                            <a href="javascript:void(0)" @click="toJobDetail(item.id)">
                                <el-row class="name">
                                    <el-col :span="12" class="title">{{item.jobName}}</el-col>
                                    <el-col :span="12" class="red">{{item.salaryStart}}k-{{item.salaryEnd}}k</el-col>
                                </el-row>
                                <el-row>
                                    <p>
                                        {{item.workPlace}}
                                        <em class="vline"></em>
                                        {{item.workExperience===0?'经验不限':item.workExperience===1?'应届生':item.workExperience===2?'1年以内':item.workExperience===3?'1~3年':item.workExperience===4?'3～5年':item.workExperience===5?'5～10年':'10年以上'}}
                                        <em class="vline"></em>
                                        {{item.workEducation===0?'大专':item.workEducation===1?'本科':item.workEducation===2?'硕士':item.workEducation===3?'博士':'不限'}}
                                    </p>
                                </el-row>
                            </a>
                        </el-col>
                        <!-- 公司信息 -->
                        <el-col :span="8" class="companyInfo">
                            <a href="javascript:void(0)" @click="toCompanyDetail(item.companyId)">
                                <el-row class="name">
                                    <el-col>{{item.companyName}}</el-col>
                                </el-row>
                                <el-row>
                                    <p>
                                        <span>
                                            <span v-for="(it,ind) in industryCategory" :key="ind" v-show="it.value === item.industryCategory">
                                                {{it.name}}
                                            </span>
                                        </span>
                                        <em class="vline"></em>
                                        <span>  
                                            <span v-for="(it,ind) in financingStatus" :key="ind" v-show="it.value === item.financingStatus">
                                                {{it.name}}
                                            </span>
                                        </span>
                                        <em class="vline"></em>
                                            {{item.staffNum===0?'少于15人':item.staffNum===1?'15-50人':item.staffNum===2?'50-150人':item.staffNum===3?'150-500人':item.staffNum===4?'500-2000人':'2000人以上'}}
                                    </p>
                                </el-row>
                            </a>
                        </el-col>
                        <!-- 招聘者信息 -->
                        <el-col :span="7" class="recruiterInfo">
                            <el-row class="name">
                                <img :src="item.headImg" >
                                {{item.nickName===''?'匿名':item.nickName}}
                                <em class="vline"></em>
                                {{item.position}}
                            </el-row>
                            <el-row>
                                <p style="padding-left:40px">
                                    发布于{{item.createTime}}
                                </p>
                            </el-row>
                        </el-col>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination">
                        <el-pagination 
                            @current-change="handleCurrentChange"
                            :current-page.sync="query.pageNo"
                            :page-size="query.pageSize"
                            layout="prev, pager, next,total"
                            :total="total">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/axios/api.js'
export default {
    data(){
       return{
           //选择样式
           CityAcitve:'',
           workEducationActive:null,
           workExperiencenActive:null,
           industryCategoryAcitve:null,
           financingStatusAcitve:null,
           staffNumAcitve:null,
           salaryActive:null,
           hotCity:['北京','上海','广州','深圳','杭州','天津','西安','苏州','武汉','厦门','南京','成都','重庆',],
           industryCategory:[],
           showMore:false,
           financingStatus:[],
           staffNum:[],
           workExperience:[],
           workEducation:[],
           salary:[{start:0,end:5},{start:6,end:9},{start:10,end:15},{start:16,end:25},{start:26,end:50}],
           jobName:this.$route.params.jobName,
           category:this.$route.params.category,
           options:[],
           props:{
            label:'value',
            value:'value',
            children:'children'
           },
           selectedOptions:[],
           query:{
               jobName:'',
               category:'',
               city:'',
               workEducation:null,
               workExperience:null,
               salaryStart:null,
               salaryEnd:null,
               industryCategory:null,
               financingStatus:null,
               staffNum:null,
               pageSize:10,//每页的数据条数
               pageNo:1,//默认开始页面
           },
           total:null,//总记录数,
           jobList:[],//数据
       } 
    },
    created(){
      //数据回显
      this.industryCategory = this.$store.state.industryCategory;
      this.financingStatus = this.$store.state.financingStatus;
      this.staffNum = this.$store.state.staffNum;
      this.workEducation = this.$store.state.workEducation;
      this.workExperience = this.$store.state.workExperience;
      //查询职位分类
      this.queryJobCategory();
    },
    mounted(){
        if(this.category ===undefined || this.category ==='' || this.category === null){
            console.log("无category参数")
        }else{
            this.query.category = this.category
            this.selectedOptions = this.category.split("/")
            console.log(this.query.category)
        }
        if(this.jobName ===undefined || this.jobName ==='' || this.jobName === null){
            console.log("无jobName参数")
        }else{
            this.query.jobName = this.jobName
            console.log(this.query.jobName)
        }
        this.queryJob(null,null,null);
    },
    methods:{
        handleCurrentChange(val){
             this.query.pageNo = val;
             this.queryJob(null,null,null)
        },
        queryJobCategory(){
            api.getAllCategory()
            .then(res =>{
                let categorys = res.data;
                let options = []
                categorys.forEach((first,index) => {
                    options.push({
                    value:first.firstName,
                    lable:first.firstId,
                    children:[]
                    })
                    first.jobSecondCategoryResponseList.forEach((second,ind)=>{
                        options[index].children.push({
                            value:second.secondName,
                            lable:second.secondId,
                            children:[]
                        })
                        second.jobThirdCategoryResponseList.forEach((third)=>{
                            options[index].children[ind].children.push({
                            value:third.thirdName,
                            })
                        })
                    })
                });
            this.options = options;
            })
        },
        handleCategoryChange(val){
            this.query.category = val.join("/");
        },
        //清空搜素条件
        resetQuery(){
            window.location.href = "/job/list"
        },
        //查询
        queryJob(index,value,type){
            if(type === 0){
                this.query.city = value;
                this.CityAcitve = index;
            }
            if(type === 1){
                // this.industryCategoryAcitve = index;
                // this.query.industryCategory = value;
            }
            if(type === 2){
                this.workExperiencenActive = index;
                this.query.workExperience = value;
            }
            if(type === 3){
                this.workEducationActive = index;
                this.query.workEducation = value;
            }
            if(type === 4){
                this.financingStatusAcitve = index;
                this.query.financingStatus = value;
            }
            if(type === 5){
                this.staffNumAcitve= index;
                this.query.staffNum = value;
            }
            if(type === 6){
                this.industryCategoryAcitve = index;
                this.query.industryCategory = value;
            }
            api.queryJob(this.query)
            .then(res=>{
                this.jobList = res.data.list;
                this.total = res.data.total;
            })
        },
        querySalary(index,start,end){
            this.salaryActive = index;
            this.query.salaryStart = start;
            this.query.salaryEnd = end;
            this.queryJob(null,null,null);
        },
        toCompanyDetail(companyId){
            this.$router.push({
                name:'companyDetail',
                params:{
                    companyId
                }
            })
        },
        toJobDetail(jobId){
            this.$router.push({
                name:'jobDetail',
                params:{
                    jobId
                }
            })
        },
    },
    
}
</script>

<style lang="scss" scoped>
.filter{
    padding-left: 10px;
    margin-top: 20px;
}
.filter-row{
    margin-top: 15px;
    font-size: 15px
}
.filter-row a{
    display: inline-block;
    margin-right: 6px;
    padding: 1px 8px 0;
    font-size: 14px
}
.selected{
    color: #00c2b3;
}
.findMore{
    float: right;
    font-weight: 100
}

.jobList{
    width: 100%;
}
.job-primary{
    height: 50px;
    padding: 22px 0;
    margin: 0 30px;
    border-bottom: 1px #f2f2f5 solid;
    position: relative;
}

.name{
    font-size: 16px;
    font-weight: 400;
    height: 26px;
    line-height: 26px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.name .title{
    color: #00c2b3;
    max-width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.name .red{
    color: #fc703e!important;
}

.jobList p{
    margin-top: 2px;
    font-size: 12px;
    color: #9fa3b0;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.vline {
    display: inline-block;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
}

.recruiterInfo img{
    width: 20px;
    height: 20px;
    border-radius: 40px;
    vertical-align: middle;
    margin: -3px 10px 0 0;
}

.pagination{
    text-align: center
}
</style>
