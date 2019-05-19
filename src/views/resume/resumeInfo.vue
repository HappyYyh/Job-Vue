<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2" style="margin-top:20px;">
            <!-- 简历部分 -->
            <el-card class="resumeInfo">
                <el-button class="review" v-show="baseShow.id!=null" type="text" @click="showReview = true;htmlTitle=baseShow.name+'的简历'">简历预览</el-button>
                <!-- 预览简历对话框 -->
                <el-dialog  :visible.sync="showReview"  width="50%" top="0" center>
                    <div class="container" id="pdfDom">
                        <!-- 基础信息 -->
                        <div class="basis">
                            <img :src="img" class="basis-img" alt="">
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
                    <span slot="footer" class="download-resume-footer">
                        <el-button type="primary" @click="showReview = false;getPdf()">下载</el-button>
                    </span>
                </el-dialog>
                <!-- 基本信息 -->
                <div class="clear">
                    <div v-show="baseShow.id===null && firstShow">
                        <a href="javascript:void(0);" class="link-add" @click="userBaseShow =false ; firstShow =false">
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
                                        <span><i class="ico el-icon-mobile-phone"></i>{{baseShow.phone}}</span>
                                        <em class="vline"></em>
                                        <span><i class="ico el-icon-message"></i>{{baseShow.email}}</span>
                                    </p>
                                    <p class="job">
                                        <span><i class="ico el-icon-date"></i>{{baseShow.birthDay}}</span>
                                        <em class="vline"></em>
                                        <span><i class="ico el-icon-location-outline"></i>{{baseShow.city}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="img">
                                <img :src="img" alt="">
                                <a href="javascript:void(0);" @click="userBaseShow = false;baseForm={...baseShow}" class="userInfo-upd">
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
                                        <el-date-picker v-model="baseForm.birthDay" value-format="yyyy-MM-dd" type="date" placeholder="选择生日"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="userBaseShow = true">取消</el-button>
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
                        <a href="javascript:void(0);" class="link-add" @click="introduceShow = false"  v-show="baseShow.introduce===''">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a>
                        <h3 class="title">个人介绍</h3>
                        <div class="introduce item" v-show="baseShow.introduce!==''">
                            <div class="left">
                                <el-col :offset="2" :span="18">
                                    <p class="text">
                                        {{baseShow.introduce}}
                                    </p>
                                </el-col>
                                    
                            </div>
                            <div class="right">
                                <a href="javascript:void(0);" class="link-edit" @click="introduceShow = false;baseForm={...baseShow}">
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
                        <a href="javascript:void(0);" class="link-add" @click="expJobShow = false"  v-show="baseShow.expJob===''">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>添加</span>
                        </a>
                        <h3 class="title">求职期望</h3>
                        <!-- 求职期望信息展示 -->
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
                                <a href="javascript:void(0);" class="link-edit" @click="expJobShow = false;baseForm={...baseShow}">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- 求职期望编辑 -->
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
                    <a href="javascript:void(0);" class="link-add" @click="eduShow=false;eduForm={...empEduForm}">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </a>
                    <h3 class="title">教育信息</h3>
                    <div v-show="eduShow">
                        <div v-for="(item,index) in resumeEducationResponseList" :key="index" @mousemove="editEduBtnShow=index" @mouseleave="editEduBtnShow=null">
                            <div class="left">
                                <el-col :offset="2" :span="18">
                                    <p>
                                        {{item.universityName}} / {{item.startYear}}-{{item.endYear}} / {{item.professionalName}} /
                                        <span v-for="(edu,ind) in educationOptions" :key="ind" v-show="edu.value===item.education">{{edu.name}}学历</span>
                                    </p>
                                </el-col>
                                
                            </div>
                            <div class="right">
                                <a href="javascript:void(0);" class="link-edit" @click="editEdu(index)" v-show="editEduBtnShow!=null && editEduBtnShow===index">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                </a>
                                <a href="javascript:void(0);" class="link-edit" @click="delRecord(item.id,0)" v-show="editEduBtnShow!=null && editEduBtnShow===index">
                                   <i class="el-icon-remove-outline"></i>
                                    <span>删除</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-show="!eduShow">
                        <el-form ref="eduForm" :model="eduForm" label-width="80px">
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="学校名称">
                                      <el-input v-model="eduForm.universityName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-input v-show="false" v-model="eduForm.id"></el-input>
                                <el-input v-show="false" v-model="eduForm.showIndex"></el-input>
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="专业名称">
                                       <el-input v-model="eduForm.professionalName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="学历">
                                        <el-select v-model="eduForm.education" placeholder="请选择学历">
                                            <el-option v-for="item in educationOptions" :key="item.value" :value="item.value" :label="item.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="开始年份">
                                        <el-date-picker v-model="eduForm.startYear" value-format="yyyy" type="year" placeholder="选择开始年份"/>
                                        
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="结束年份">
                                        <el-date-picker v-model="eduForm.endYear" value-format="yyyy" type="year" placeholder="选择结束年份"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="eduShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%" @click="submitEdu">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 工作经验 -->
                <div class="clear">
                    <a href="javascript:void(0);" class="link-add" @click="experienceShow = false;experienceForm={...emptyExperienceForm}">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </a>
                    <h3 class="title">工作经验</h3>
                    <div v-show="experienceShow">
                        <div v-for="(item,index) in resumeExperienceResponseList" :key="index" @mousemove="editExperienceBtnShow=index" @mouseleave="editExperienceBtnShow=null">
                            <div class="left">
                                <el-row>
                                    <el-col :offset="2" :span="18">
                                        <span class="companyName">{{item.companyName}}</span>
                                        <em class="vline"></em>
                                        <span class="time">{{item.startTime}} ~ {{item.endTime}}</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :offset="2" :span="16" class="job-info">
                                        {{item.department}}
                                        <em class="vline"></em>
                                        {{item.position}} 
                                        <em class="vline"></em>
                                        {{item.job}}
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :offset="2" :span="2" style="margin-top:8px">
                                        详情
                                    </el-col>
                                    <el-col :span="18" style="margin-top:8px">
                                        <span class="detail">{{item.detail}}</span>
                                    </el-col>
                                </el-row>
                                <hr class="hr">
                            </div>
                            <div class="right">
                                <a href="javascript:void(0);" class="link-edit" @click="editExperience(index)" v-show="editExperienceBtnShow!=null && editExperienceBtnShow===index">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                     
                                </a>
                                <a href="javascript:void(0);" class="link-edit" @click="delRecord(item.id,1)" v-show="editExperienceBtnShow!=null && editExperienceBtnShow===index">
                                   <i class="el-icon-remove-outline"></i>
                                    <span>删除</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-show="!experienceShow">
                        <el-form ref="experienceForm" :model="experienceForm" label-width="80px">
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="公司名称">
                                      <el-input v-model="experienceForm.companyName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="所属部门">
                                      <el-input v-model="experienceForm.department"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-input v-show="false" v-model="experienceForm.id"></el-input>
                                <el-input v-show="false" v-model="experienceForm.showIndex"></el-input>
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="岗位名称">
                                       <el-input v-model="experienceForm.position"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="职位名称">
                                        <el-input v-model="experienceForm.job"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="开始时间">
                                        <el-date-picker v-model="experienceForm.startTime" value-format="yyyy-MM-dd" type="date" placeholder="选择开始时间"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="结束时间">
                                        <el-date-picker v-model="experienceForm.endTime" value-format="yyyy-MM-dd" type="date" placeholder="选择结束时间"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20" :offset="1">
                                    <el-form-item label="详细描述">
                                        <el-input v-model="experienceForm.detail" type="textarea" :rows="4"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="experienceShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%" @click="submitExperience">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <!-- 项目经历 -->
                <div class="clear">
                     <a href="javascript:void(0);" class="link-add" @click="projectShow = false;projectForm={...emptyProjectForm}">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>添加</span>
                    </a>
                    <h3 class="title">项目经历</h3>
                    <div v-show="projectShow">
                        <div v-for="(item,index) in resumeProjectResponseList" :key="index" @mousemove="editProjectBtnShow=index" @mouseleave="editProjectBtnShow=null">
                            <div  class="left">
                                <el-row>
                                    <el-col :offset="2" :span="18">
                                        <span class="projectName">{{item.projectName}}</span>
                                        <em class="vline"></em>
                                        <span class="time">{{item.startTime}} ~ {{item.endTime}}</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :offset="2" :span="3" style="margin-top:8px">
                                        项目描述
                                    </el-col>
                                    <el-col :span="18" style="margin-top:8px">
                                        <span class="detail">{{item.description}}</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :offset="2" :span="3" style="margin-top:8px">
                                        项目成就
                                    </el-col>
                                    <el-col :span="18" style="margin-top:8px">
                                        <span class="detail">{{item.result}}</span>
                                    </el-col>
                                </el-row>
                                <hr class="hr">
                            </div>
                            <div class="right">
                                <a href="javascript:void(0);" class="link-edit" @click="editProject(index)" v-show="editProjectBtnShow!=null && editProjectBtnShow===index">
                                    <i class="el-icon-circle-plus-outline"></i>
                                    <span>编辑</span>
                                </a>
                                <a href="javascript:void(0);" class="link-edit" @click="delRecord(item.id,2)" v-show="editProjectBtnShow!=null && editProjectBtnShow===index">
                                   <i class="el-icon-remove-outline"></i>
                                    <span>删除</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-show="!projectShow">
                        <el-form ref="projectForm" :model="projectForm" label-width="80px">
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="项目名称">
                                      <el-input v-model="projectForm.projectName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-input v-show="false" v-model="projectForm.id"></el-input>
                                <el-input v-show="false" v-model="projectForm.showIndex"></el-input>
                            </el-row>
                            <el-row>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="开始时间">
                                        <el-date-picker v-model="projectForm.startTime" value-format="yyyy-MM" type="month" placeholder="选择开始时间"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="结束时间">
                                        <el-date-picker v-model="projectForm.endTime" value-format="yyyy-MM" type="month" placeholder="选择结束时间"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20" :offset="1">
                                    <el-form-item label="项目描述">
                                        <el-input v-model="projectForm.description" type="textarea" :rows="4"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20" :offset="1">
                                    <el-form-item label="项目成就">
                                        <el-input v-model="projectForm.result" type="textarea" :rows="4"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4" :offset="14">
                                    <el-button style="width:100%" @click="projectShow=true">取消</el-button>
                                </el-col>
                                <el-col :span="4" >
                                    <el-button style="width:100%" @click="submitProject">确认</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
            </el-card>
            <!-- 三方简历部分 -->
            <el-card class="resumeControl" >
                <div slot="header" class="clearfix">
                    <span class="title">附件简历</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addOtherResume">新增</el-button>
                </div>
                <div class="otherResume" v-for="(other,index) in otherResumeList" :key="index">
                    <span class="resumeName">{{other.name}}</span>
                    <a href="javascript:void(0)" @click="deleteOtherResume(other.url,other.id)"><i class="el-icon-delete"></i></a>
                    <a @click="downloadOtherResume(other.url,other.name)"><i class="el-icon-download"></i></a>
                </div>
            </el-card>
            <!-- 三方文件上传对话框 -->
            <el-dialog title="三方简历上传" :visible.sync="otherResumeDialog" width="30%" center>
                <el-upload
                    class="upload-demo"
                    action="http://localhost:8888/file/upload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :limit="1"
                    :file-list="fileList"
                    :on-exceed="handleExceed"
                    :on-success="getUrl"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传doc/docx/pdf文件，且不超过2M</div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancleUpload">取 消</el-button>
                    <el-button type="primary" @click="confirmUpload">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 对外公开部分 -->
            <el-card class="resumeControl Privacy">
                <div slot="header" class="clearfix">
                    <span class="title">隐私设置</span>
                    <el-button style="float: right; padding: 3px 0" type="text">设置</el-button>
                </div>
                <div class="item">
                    公开情况:  <span>{{baseShow.isPublic===0?'尚未公开':'对外公开'}}</span>
                </div>
                <div class="item">
                    屏蔽公司:  <span>已屏蔽{{baseShow.shieldCompanyCount}}个</span>
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
            htmlTitle:'',
            showReview:false,
            //对话框
            otherResumeDialog:false,
            //用于控制显示
            firstShow:true,
            userBaseShow:true,
            introduceShow:true,
            expJobShow:true,
            eduShow:true,
            experienceShow:true,
            projectShow:true,
            userId:null,
            editEduBtnShow:null,
            editExperienceBtnShow:null,
            editProjectBtnShow:null,
            img:'',
            //基础信息显示
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
            //基础信息的form
            baseForm:{
                id:null,
                userId:'',
                name:'',
                birthDay:'',
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
            //空的form用于新增的时候清空
            empEduForm:{
                id:null,
                showIndex:null,
                resumeId:null,
                universityName:'',
                startYear:'',
                endYear:'',
                education:null,
                professionalName:''
            },
            //教育信息的form表单
            eduForm:{
                id:null,
                showIndex:null,
                resumeId:null,
                universityName:'',
                startYear:'',
                endYear:'',
                education:null,
                professionalName:''
            },
            //空的form用于清空
            emptyExperienceForm:{
                id:null,
                showIndex:null,
                resumeId:null,
                companyName:'',
                department:'',
                position:'',
                job:'',
                startTime:'',
                endTime:'',
                detail:''
            },
            //工作经验的form表单
            experienceForm:{
                id:null,
                showIndex:null,
                resumeId:null,
                companyName:'',
                department:'',
                position:'',
                job:'',
                startTime:'',
                endTime:'',
                detail:''
            },
            //空form
            emptyProjectForm:{
                id:null,
                showIndex:null,
                resumeId:null,
                projectName:'',
                startTime:'',
                endTime:'',
                description:'',
                result:'',
            },
            //项目表单
            projectForm:{
                id:null,
                showIndex:null,
                resumeId:null,
                projectName:'',
                startTime:'',
                endTime:'',
                description:'',
                result:'',
            },
            otherResumeList:{},
            fileList: [],
            otherResumeForm:{name:'',url:''},
            resumeEducationResponseList:[],
            resumeExperienceResponseList:[{detailList:[]}],
            resumeProjectResponseList:[{descriptionList:[],resultList:[]}],
            //下拉列表的选项
            expJobTypeOptions:[{value:0,name:'全职'},{value:1,name:'兼职'},{value:2,name:'实习'}],
            expNowStatusOptions:[{value:0,name:'积极找工作'},{value:1,name:'随便看看'},{value:2,name:'暂时不换工作'}],
            expComeTimeOptions:[{value:0,name:'随时到岗'},{value:1,name:'两周以内'},{value:2,name:'两周到一个月'},{value:3,name:'一到三个月'},{value:4,name:'三个月以上'}],
            educationOptions:[{value:0,name:'大专'},{value:1,name:'本科'},{value:2,name:'硕士'},{value:3,name:'博士'}],
            //表单校验规则
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
        this.img = userInfo.headImg;
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
                //信息展示
                this.baseShow = res.data.resumeBaseResponse;
                this.resumeEducationResponseList = res.data.resumeEducationResponseList; 
                this.resumeExperienceResponseList = res.data.resumeExperienceResponseList;
                this.resumeProjectResponseList = res.data.resumeProjectResponseList;
                this.otherResumeList = res.data.resumeOtherResponseList;
                //将文本分割换行
                this.resumeExperienceResponseList.forEach((item)=>{
                    item.detailList = item.detail.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                })
                this.resumeProjectResponseList.forEach((item)=>{
                    item.descriptionList = item.description.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                    item.resultList = item.result.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
                })
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
                    this.baseForm.userId = this.userId
                    console.log(this.baseForm);
                    api.submitBase(this.baseForm)
                        .then(res=>{
                            if(res.success){
                                this.baseShow = {...this.baseForm};
                                if(res.data!=null){
                                    //如果是新增
                                    console.log("新增成功")
                                    this.baseShow.id = res.data
                                }
                                //赋值
                                this.userBaseShow = true;
                                this.introduceShow = true;
                                this.expJobShow = true;
                            }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editEdu(index){
            this.eduForm = {...this.resumeEducationResponseList[index]}
            this.eduForm.showIndex = index;
            this.eduShow = false;
        },
        submitEdu(){
            this.eduForm.resumeId = this.baseShow.id;
            api.submitEducation(this.eduForm)
                .then(res=>{
                    if(res.success){
                        console.log("教育模块操作完成")
                        if(this.eduForm.id===null){
                            //新增则页面跳转
                            window.location.href="/resume/resumeInfo";
                        }else{
                            //修改则关闭信息
                            this.resumeEducationResponseList[this.eduForm.showIndex] = {...this.eduForm};
                            this.eduShow = true;
                        }
                    }
                })
        },
        editExperience(index){
            this.experienceForm = {...this.resumeExperienceResponseList[index]}
            this.experienceForm.showIndex = index;
            this.experienceShow = false;
        },
        submitExperience(){
            this.experienceForm.resumeId = this.baseShow.id;
            api.submitExperience(this.experienceForm)
                .then(res=>{
                    if(res.success){
                        console.log("工作经验操作完成")
                        if(this.experienceForm.id===null){
                            //新增则页面跳转
                            window.location.href="/resume/resumeInfo";
                        }else{
                            //修改则关闭信息
                            this.resumeExperienceResponseList[this.experienceForm.showIndex] = {...this.experienceForm};
                        }
                        this.experienceShow = true;
                    }
                })
        },
        editProject(index){
            this.projectForm = {...this.resumeProjectResponseList[index]}
            this.projectForm.showIndex = index;
            this.projectShow = false;
        },
        submitProject(){
            this.projectForm.resumeId = this.baseShow.id;
            api.submitProject(this.projectForm)
                .then(res=>{
                    if(res.success){
                        console.log("工作经验操作完成")
                        if(this.projectForm.id===null){
                            //新增则页面跳转
                             window.location.href="/resume/resumeInfo";
                        }else{
                            //修改则关闭信息
                            this.resumeProjectResponseList[this.projectForm.showIndex] = {...this.projectForm};
                        }
                        this.projectShow = true;
                    }
                })
        },
        delRecord(id,type){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.deleteResume({
                    id,
                    type
                }).then(res=>{
                    if(res.success){
                       window.location.href="/resume/resumeInfo"; 
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        addOtherResume(){
            if(this.otherResumeList.length < 3){
                this.otherResumeDialog = true;
            }else{
                this.$message({
                    type:'warning',
                    message:'每个用户最多只能上传三份简历'
                })
            }
            console.log(this.otherResumeList)
        },
        cancleUpload(){
            if(this.otherResumeForm.url != '' || this.otherResumeForm.name != ''){
                //取消的时候删除文件
                this.deleteUrl();
            }
            this.otherResumeDialog = false;
        },
        confirmUpload(){
            console.log(this.otherResumeForm)
            if(this.otherResumeForm.url === '' || this.otherResumeForm.name === ''){
                this.$message({
                    type:'error',
                    message:'暂无文件'
                })
            }else{
                api.addOtherResume({
                    userId:this.userId,
                    url:this.otherResumeForm.url,
                    name:this.otherResumeForm.name
                }).then(res=>{
                    if(res.success){
                        window.location.href="/resume/resumeInfo"
                    }
                })
                this.otherResumeDialog = false;
            }
            
        },
        //删除
        deleteOtherResume(url,id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.fileDelete({url}).then(res=>{
                    if(res.success){
                        api.deleteOtherResume({id})
                        .then(()=>{
                                window.location.href="/resume/resumeInfo"
                        })
                    }
                }) 
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //文件下载
        downloadOtherResume(url,name){
            // console.log(name)
            // window.location.href = url;
            const blob = new Blob([url])
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, name)
            } else {
                //  chrome/firefox
                let aTag = document.createElement('a')
                aTag.download = name
                aTag.href = URL.createObjectURL(blob)
                aTag.click()
                URL.revokeObjectURL(aTag.href)
            }
        },
        deleteUrl(){
            var url = this.otherResumeForm.url;
            api.fileDelete({url}).then(res=>{
                if(res.success){
                    this.otherResumeForm.url = '';
                    this.otherResumeForm.name = '';
                }
            })
        },
        // eslint-disable-next-line no-unused-vars
        handleRemove(file, fileList) {
            this.deleteUrl()
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            console.log(fileList);  
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // eslint-disable-next-line no-unused-vars
        getUrl(response, file, fileList){
            console.log(response);
            if(response.success){
                this.otherResumeForm.url = response.data
                this.otherResumeForm.name = file.name
            }
        },
    }
}
</script>

<style lang="scss" scoped>
//dialog
.container{
    background-color: rgb(255, 255, 255);
    min-height: 100%;
    padding: 45px 50px;
}
.download-resume-footer{
    z-index: 2;
    position: fixed;
    bottom: 0px;
    left: 25%;
    width: 50%;
    background-color: rgb(255, 255, 255);
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.04) 0px -5px 8px 0px;
    padding: 11px 0px;
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
//主页面
//右侧简历控制
.resumeControl{
    width: 20%;
    margin-left: 77%;
    padding: 0 18px!important;
}

.resumeControl .title{
    color: #414a60;
    font-size: 14px;
    padding: 18px 0 10px 0;
    font-weight: 400;
}
//三方简历
.otherResume{
    margin-bottom: 10px
}
.otherResume span{
    font-size: 15px;
    font-weight: 300;
    float: left;
    overflow: hidden; 
    //超出部分以。。。显示
    text-overflow: ellipsis; 
    white-space:nowrap;
    width:140px;
    display:block;
}
.otherResume i{
    margin-left: 10px;
}

// 隐私设置
.Privacy{
    margin-top: 40px;
}
.Privacy .item{
    font-size: 14px;
    margin-bottom: 10px
}
.Privacy .item span{
    float: right;
    font-size: 13px;
    color: #9fa3af;
}
//左侧简历信息
.resumeInfo{
    width: 60%;
    margin-left: 15%;
    float: left;
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
.ico{
    margin-right: 4px;
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
    margin: 0 5px 0 0;
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
.companyName{
    font-size: 16px;
    font-weight: 700;
}
.projectName{
    font-size: 16px;
    font-weight: 700;
}
.time{
    color: #8d92a1;
    font-size: 12px;
}
.job-info{
    margin-top: 5px;
    font-weight: 500;
}
.detail{
    font-weight: 300;
}
.hr{
    width: 80%;
    border: 1px #f2f3f3 solid;
}
</style>
