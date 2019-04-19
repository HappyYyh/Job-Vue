<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2">
            <el-card class="box-card">
                <span class="review">简历预览</span>
                <!-- 基本信息 -->
                <div>
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
                    <div v-show="!userBaseShow" class="userBaseUpd upd">
                        <h3 class="title">基础信息编辑</h3>
                        <el-form ref="baseForm" :model="baseForm" label-width="80px">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="姓名">
                                        <el-input v-model="baseForm.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="性别">
                                        <el-radio-group v-model="baseForm.sex">
                                            <el-radio-button label="1">女</el-radio-button>
                                            <el-radio-button  label="0">男</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="手机">
                                        <el-input v-model="baseForm.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="邮箱">
                                        <el-input v-model="baseForm.email"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="城市">
                                        <el-input v-model="baseForm.city"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="生日">
                                        <el-date-picker v-model="baseForm.birthDay" type="date" placeholder="选择生日"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="userBaseShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 个人简介 -->
                <div class="clear">
                    <div v-show="introduceShow">
                        <!-- 如果没有信息则显示添加 -->
                        <!-- <a href="" class="link-add">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a> -->
                        <h3 class="title">个人介绍</h3>
                        <div class="introduce">
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
                                    <el-button style="width:100%">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 求职期望 -->
                <div class="clear">
                    <div v-show="expJobShow">
                        <h3 class="title">求职期望</h3>
                        <div class="introduce">
                            <div class="left">
                                   
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
                        <h3 class="title ">编辑求职期望</h3>
                        <el-form ref="baseForm" :model="baseForm" label-width="80px">
                            <el-form-item label="简介">
                                <el-input type="textarea" :rows="2" v-model="baseForm.introduce"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="introduceShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 教育信息 -->
                <div class="clear">
                    <div class="item-primary">
                        <a href="" class="link-add">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a>
                       <h3 class="title">教育信息</h3>
                    </div>
                </div>
                <!-- 工作经验 -->
                <div class="clear">
                    <div class="item-primary">
                        <h3 class="title">工作经验</h3>
                    </div>
                </div>
                <!-- 项目经历 -->
                <div class="clear">
                    <div class="item-primary">
                        <h3 class="title">项目经历</h3>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>    
</div>
</template>
<script>
export default {
    data(){
        return{
            userBaseShow:true,
            introduceShow:true,
            expJobShow:true,
            baseShow:{
                name:'杨永昊',
                birthDay:'1997-03-27',
                sex:'0',
                city:'南京',
                phone:'17314981254',
                email:'863044052@qq.com',
                introduce:'实习工作半年，了解互联网公司的技术栈，逻辑清晰，热爱学习新技能，渴望加入技术规模完整的团队。',
                expJob:'Java',
                expJobType:'0',
                expCity:'南京',
                expStartSalary:'8',
                expEndSalary:'10',
                expNowStatus:'1',
                expComeTime:'3'
            },
            baseForm:{
                userId:'',
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
            }
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
.introduce{
    margin: -10px 0 12px 0;
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
.info-labels  .vline{
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
    margin: 20px 5px 0 0;
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
