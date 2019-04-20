<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2">
            <el-card class="box-card">
                <span class="review" v-show="baseShow.id!=null">简历预览</span>
                <!-- 基本信息 -->
                <div class="clear">
                    <div v-show="baseShow.id===null && firstShow">
                        <a href="#" class="link-add" @click="userBaseShow =false ; firstShow =false">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a>
                        <h3 class="title">基本信息</h3>
                    </div>
                    <!-- 基础信息显示 -->
                    <div v-show="baseShow.id!=null">
                        <div class="userBaseShow" v-show="userBaseShow" style="height:140px">
                            <div class="userInfo">
                                <h2 class="name">{{baseShow.name}}</h2>
                                <div class="info-labels">
                                    <p class="contact">
                                        <span>{{baseShow.phone}}</span>
                                        <em class="vline"></em>
                                        <span>{{baseShow.email}}</span>
                                    </p>
                                    <p class="job">
                                        <span>{{baseShow.birthDay}}</span>
                                        <em class="vline"></em>
                                        <span>{{baseShow.city}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="img">
                                <img src="http://image.yangyhao.top/images/jpg/15553839067507580.jpg" alt="">
                                <a href="#" @click="userBaseShow = false" class="userInfo-upd">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- 基础信息编辑 -->
                    <div v-show="!userBaseShow" class="userBaseUpd upd">
                        <h3 class="title">基础信息编辑</h3>
                        <el-form ref="baseForm" :rules="rules" :model="baseForm" label-width="80px">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="姓名" prop="name">
                                        <el-input v-model="baseForm.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="性别">
                                        <el-radio-group v-model="baseForm.sex">
                                            <el-radio-button label="1">女</el-radio-button>
                                            <el-radio-button label="0">男</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="手机" prop="phone">
                                        <el-input v-model="baseForm.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input v-model="baseForm.email"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="城市">
                                        <el-cascader :options="options" :props="props" v-model="selectedOptions" :show-all-levels="false" @change="handleCityChange" placeholder="请选择城市"></el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="生日">
                                        <el-date-picker v-model="baseForm.birthDayDate" type="date" placeholder="选择生日"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="userBaseShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%" @click="addOrEditBaseInfo('baseForm')">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 个人简介 -->
                <div class="clear">
                    <div v-show="introduceShow">
                        <!-- 如果没有信息则显示添加 -->
                        <a href="#" class="link-add" @click="introduceShow = false"  v-show="baseShow.introduce===''">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a>
                        <h3 class="title">个人介绍</h3>
                        <div class="introduce item" v-show="baseShow.introduce!==''">
                            <div class="left">
                                    <p class="text">
                                    {{baseShow.introduce}}
                                </p>
                            </div>
                            <div class="right">
                                <a href="#" class="link-edit" @click="introduceShow = false">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-show="!introduceShow" class="upd">
                        <hr class="updIntroduceTitle">
                        <h3 class="title ">编辑个人简介</h3>
                        <el-form ref="baseForm" :model="baseForm" label-width="80px">
                            <el-form-item label="简介">
                                <el-input type="textarea" :rows="2" v-model="baseForm.introduce"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="introduceShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%" @click="addOrEditBaseInfo('baseForm')">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 求职期望 -->
                <div class="clear">
                    <div v-show="expJobShow">
                        <!-- 如果没有信息则显示添加 -->
                        <a href="#" class="link-add" @click="expJobShow = false"  v-show="baseShow.expJob===''">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a>
                        <h3 class="title">求职期望</h3>
                        <div class="item" v-show="baseShow.expJob!==''">
                            <div class="left">
                                <el-row>
                                    <el-col :span="18" :offset="2">
                                        {{baseShow.expJob}}
                                        <em class="vline"></em>
                                        {{baseShow.expStartSalary}}K-{{baseShow.expEndSalary}}K
                                        <em class="vline"></em>
                                        {{baseShow.expCity}}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="18" :offset="2">
                                        <span>
                                            <span v-for="(item,index) in expJobTypeOptions" :key="index" v-show="item.value==baseShow.expJobType">{{item.name}}</span>
                                        </span>
                                        <em class="vline"></em>
                                        <span>
                                            <span v-for="(item,ind) in expNowStatusOptions" :key="ind" v-show="item.value==baseShow.expNowStatus">{{item.name}}</span>
                                        </span>
                                        <em class="vline"></em>
                                        <span>
                                            <span v-for="(item,id) in expComeTimeOptions" :key="id" v-show="item.value==baseShow.expComeTime">{{item.name}}</span>
                                        </span>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="right">
                                <a href="#" class="link-edit" @click="expJobShow = false">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-show="!expJobShow" class="upd">
                        <hr class="updIntroduceTitle">
                        <h3 class="title">编辑求职期望</h3>
                        <el-form ref="baseForm" :model="baseForm" label-width="80px">
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="期望职位">
                                      <el-input v-model="baseForm.expJob"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="薪资要求">
                                    <el-col :span="10">
                                        <el-input v-model="baseForm.expStartSalary"></el-input>
                                    </el-col>
                                    <el-col :span="4" style="text-align: center">
                                        -
                                    </el-col>
                                    <el-col :span="10">
                                        <el-input v-model="baseForm.expEndSalary"></el-input>
                                    </el-col>
                                 </el-form-item>
                                </el-col>    
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="期望城市">
                                        <el-cascader :options="options" :props="props" v-model="selectedOptions2" :show-all-levels="false" @change="handleExpCityChange" placeholder="请选择城市"></el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                        <el-form-item label="期望类型">
                                        <el-select v-model="baseForm.expJobType" placeholder="请选择">
                                            <el-option v-for="item in expJobTypeOptions" :key="item.value" :value="item.value" :label="item.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="当前状态">
                                        <el-select v-model="baseForm.expNowStatus" placeholder="请选择">
                                            <el-option v-for="item in expNowStatusOptions" :key="item.value" :value="item.value" :label="item.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="到岗时间">
                                        <el-select v-model="baseForm.expComeTime" placeholder="请选择">
                                            <el-option v-for="item in expComeTimeOptions" :key="item.value" :value="item.value" :label="item.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="expJobShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%" @click="addOrEditBaseInfo('baseForm')">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 教育信息 -->
                <div class="clear">
                    <a href="" class="link-add">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </a>
                    <h3 class="title">教育信息</h3>
                </div>
                <!-- 工作经验 -->
                <div class="clear">
                    <a href="" class="link-add">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </a>
                    <h3 class="title">工作经验</h3>
                </div>
                <!-- 项目经历 -->
                <div class="clear">
                     <a href="" class="link-add">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </a>
                    <h3 class="title">项目经历</h3>
                </div>
            </el-card>
        </el-col>
    </el-row>    
</div>
</template>
<script>
import api from '../../axios/api';
export default {
    data(){
        return{
            firstShow:true,
            userBaseShow:true,
            introduceShow:true,
            expJobShow:true,
            userId:null,
            baseShow:{
                id:null,
                name:'',
                birthDay:'',
                sex:'',
                city:'',
                phone:'',
                email:'',
                introduce:'',
                expJob:'',
                expJobType:'',
                expCity:'',
                expStartSalary:'',
                expEndSalary:'',
                expNowStatus:'',
                expComeTime:''
            },
            baseForm:{
                id:null,
                userId:'',
                name:'',
                birthDayDate:'',
                sex:null,
                city:'',
                phone:'',
                email:'',
                introduce:'',
                expJob:'',
                expJobType:null,
                expCity:'',
                expStartSalary:null,
                expEndSalary:null,
                expNowStatus:null,
                expComeTime:null
            },
            eduShow:[],
            experienceShow:[],
            projectShow:[],
            expJobTypeOptions:[{value:0,name:'全职'},{value:1,name:'兼职'},{value:2,name:'实习'}],
            expNowStatusOptions:[{value:0,name:'积极找工作'},{value:1,name:'随便看看'},{value:2,name:'暂时不换工作'}],
            expComeTimeOptions:[{value:0,name:'随时到岗'},{value:1,name:'两周以内'},{value:2,name:'两周到一个月'},{value:3,name:'一到三个月'},{value:4,name:'三个月以上'}],
            rules:{
                name:[{required: true, message: '请输入姓名', trigger: 'blur'},
                      {min:2,max:30,message: '姓名长度在 2 到 30 个字符', trigger: 'blur' }],
                phone:[{min:11,max:11,message: '手机号长度为11位', trigger: 'blur'}],
                email:[{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
            },
            options:[],
            props:{
                label:'name',
                value:'name',
                children:'child'
            },
            selectedOptions:[],
            selectedOptions2:[]
        }
    },
    created(){
        let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
        this.userId  = userInfo.id;
    },
    mounted(){
        this.myResume();
        this.queryCity();
    },
    methods:{
        myResume(){
            api.myResume({
                userId:this.userId
            }).then(res=>{
                this.baseShow = res.data.resumeBaseResponse;
                this.baseForm = res.data.resumeBaseResponse;
                this.eduShow = res.data.resumeEducationResponseList; 
                this.experienceShow = res.data.resumeExperienceResponseList;
                this.projectShow = res.data.resumeProjectResponseList;
            })
        },
        queryCity(){
            api.getAllRegions().then(res=>{
                let regions =res.data;
                let options = [];
                regions.forEach( (province,index) =>{
                    options.push({
                        id:province.provinceId,
                        name:province.provinceName,
                        child:[]
                    })
                    province.regionSecondResponseList.forEach((city)=>{
                        options[index].child.push({
                            id:city.cityId,
                            name:city.cityName,
                        })
                    })
                })
                this.options = options;
            })
        },
        handleCityChange(value){
            console.log(value[1])
            this.baseForm.city = value[1]
        },
        handleExpCityChange(value){
            console.log(value[1])
            this.baseForm.expCity = value[1];
        },
        addOrEditBaseInfo(baseForm){
            this.$refs[baseForm].validate((valid) => {
                if (valid) {
                    if(this.baseForm.id === null){
                        this.baseForm.userId = this.userId
                        //新增
                        console.log(this.baseForm);
                        api.addBaseResume(this.baseForm)
                            .then(res=>{
                                if(res.success){
                                    console.log("新增成功")
                                    this.userBaseShow = true;
                                    this.introduceShow = true;
                                    this.expJobShow = true;
                                }
                            })
                    }else{
                        //修改
                        api.editBaseResume(this.baseForm)
                            .then(res=>{
                                if(res.success){
                                    console.log("修改成功")
                                    this.userBaseShow = true;
                                    this.introduceShow = true;
                                    this.expJobShow = true;
                                }
                            })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.box-card{
    width: 60%;
    margin-left: 20%;
}
.clear{
    clear: both;
}
.review{
    margin-left: 85%;
    font-size: 14px;
    color: #24272e;
}
.userBaseShow{
    padding: 0 30px;
    position: relative;
}
.userBaseUpd{
    height: 330px;
}
.upd .title{
    border: 0;
    font-size: 16px;
    font-weight: 700;
    padding: 20px 0 19px 13px;
    margin-left: 4%;
}
.left{
    margin: -10px 0 12px 0;
    font-size: 14px;
}
.introduce p{
    padding-left: 40px;
    width: 90%;
    color: #61687c;
    line-height: 23px;
}
.img{
    position: absolute;
    right: 30px;
    top: 10px;
    width: auto;
    margin-bottom: 0;
}
.img .userInfo-upd{
    display: block;
    right: -5px;
    bottom: 10px;
    margin-top: 10px;
    color: #00c2b3;
}
.userInfo-upd span{
    padding-left: 10px;
    vertical-align: middle;
}
.img img{
    width: 80px;
    height: 80px;
    border-radius: 100%;
}
.userInfo .name{
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
}
.userInfo .info-labels {
    margin-left: 3%;
    position: relative;
}
.info-labels .contact{
    margin-top: 10px;
}
.info-labels  span{
    font-size: 14px;
}
.vline{
    margin: 0 28px;
    display: inline-block;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
}
.link-add{
    float: right;
    height: 25px;
    margin: 20px 5px 0 0;
    line-height: 25px;
    color: #00c2b3;
    text-align: center;
    cursor: pointer;
}
.link-add span {
    padding-left: 10px;
    vertical-align: middle;
}
.left{
    float: left;
    width: 90%;
}
.right{
    float: right;
    width: 10%;
}
.link-edit{
    float: right;
    height: 25px;
    margin: 10px 5px 0 0;
    line-height: 25px;
    color: #00c2b3;
    text-align: center;
    cursor: pointer;
}
.link-edit span {
    padding-left: 10px;
    vertical-align: middle;
}
.title{
    width: 86%;
    border-top: 1px #f2f3f3 solid;
    color: #24272e;
    font-size: 18px;
    line-height: 25px;
    padding: 20px 0 8px 23px;
    font-weight: 400;
    position: relative;
}
.updIntroduceTitle{
    border-top: 1px #f2f3f3 solid;
}
</style>
