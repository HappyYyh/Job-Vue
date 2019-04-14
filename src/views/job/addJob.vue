<template>
<div>
  <!-- 发布职位 -->
  <el-row>
        <el-col :span="20" :offset="2">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>发布职位</span>
                </div>
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="职位名称" prop="jobName">
                        <el-col :span="10">
                         <el-input v-model="form.jobName" placeholder="请输入职位名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="职位分类">
                         <el-cascader :options="options1" class="selectClass" :props="props1" v-model="selectedOptions1" @change="handleCategoryChange" placeholder="请选择职位分类"></el-cascader>
                         <el-input v-show="false"  v-model="form.category"></el-input>
                    </el-form-item>
                    <el-form-item label="工作地点">
                         <el-cascader :options="options2" class="selectClass" :props="props2" v-model="selectedOptions2" @change="handleWorkPlaceChange" placeholder="请选择工作地点"></el-cascader>
                         <el-input v-show="false"  v-model="form.workPlace"></el-input>
                    </el-form-item>
                    <el-form-item label="学历要求">
                        <el-select v-model="form.workEducation" class="selectClass" placeholder="请选择学历要求">
                            <el-option v-for="(item,index) in workEducation" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="薪资范围" prop="salary">
                        <el-col :span="6">
                            <el-input v-model="form.salaryStart" placeholder="起始薪资">
                                <template slot="append">K</template>
                            </el-input>
                        </el-col>
                            <el-col class="line" style="text-align:center" :span="2">——</el-col>
                        <el-col :span="6">
                            <el-input v-model="form.salaryEnd" placeholder="结束薪资">
                                <template slot="append">K</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="福利待遇">
                        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="newTag" ref="saveTagInput" size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </el-form-item>
                    <el-form-item label="招聘情况" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio-button label="1">立马开始</el-radio-button>
                            <el-radio-button label="0">暂不开始</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="工作职责">
                        <el-input type="textarea" :rows="4" placeholder="请输入工作职责" v-model="form.jobDuty"></el-input>
                    </el-form-item>
                    <el-form-item label="工作要求">
                        <el-input type="textarea" :rows="4" placeholder="请输入工作要求" v-model="form.jobRequirement"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card> 
        </el-col>
    </el-row>
</div>
</template>
<script>
import api from '@/axios/api.js'
export default {
    data() {
      return {
        workEducation:[],  
        form: {
          jobName:'',
          category: '',
          recruiterId:'',
          workPlace:'',
          workEducation:'',
          salaryStart:'',
          salaryEnd:'',
          welfare:'',
          status:'',
          jobDuty:'',
          jobRequirement:''
        },
        dynamicTags: ['五险一金', '领导nice', '额外补贴'],
        inputVisible: false,
        newTag: '',
        rules: {
          jobName: [
            { required: true, message: '请输入职位名称', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请选择职位状态', trigger: 'blur' }
          ],
          salary:[
            { type:'float',  message: '薪资必须是数字', trigger: 'blur' }
          ]
        },  
        options1:[],
        options2:[],
        props1:{
          label:'value',
          value:'value',
          children:'children'
        },
        props2:{
          label:'name',
          value:'name',
          children:'child'
        },
        selectedOptions1: [],
        selectedOptions2: [],
        activeName: '0',
      }
    },
    created () {
      this.workEducation = this.$store.state.workEducation
    },
    mounted(){
      this.queryCategory();
      this.queryWorkPlace();
    },
    methods: {
      //查询职位级联  
      queryCategory(){
        api.getAllCategory().then(res=>{
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
        this.options1 = options;
        })
      },
      handleCategoryChange(value) {
        this.form.category = value.join("/");
        console.log(this.form.category)
      },
      //查询工作地点级联
      queryWorkPlace(){
        api.getAllRegions().then(res=>{
        let regions =res.data;
        let options = [];
        regions.forEach( (province,index) =>{
          options.push({
            id:province.provinceId,
            name:province.provinceName,
            child:[]
          })
          province.regionSecondResponseList.forEach((city,ind)=>{
            options[index].child.push({
              id:city.cityId,
              name:city.cityName,
              child:[]
            })
            city.regionThirdResponseList.forEach((country)=>{
              options[index].child[ind].child.push({
                id:country.countryId,
                name:country.countryName
              })
            })
          })
        })
        this.options2 = options;
      })
      },
      handleWorkPlaceChange(value) {
        this.form.workPlace = value.join("/");
        console.log(this.form.workPlace)
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user)
            this.form.recruiterId = userInfo.id
            this.form.welfare = this.dynamicTags.join("/");
            console.log(this.form)
            api.addJob(this.form)
                .then(res=>{
                    if(res.success){
                        alert("success")
                    }
                })
          } else {
            this.$message({
                type:'error',
                message:'请完成表单校验'
            })
            return false;
         }
        });
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        // eslint-disable-next-line no-unused-vars
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let newTag = this.newTag;
        if (newTag) {
          this.dynamicTags.push(newTag);
        }
        this.inputVisible = false;
        this.newTag = '';
      }
      
    }
}
</script>
<style lang="scss" scoped>
.box-card {
    width: 80%;
    margin-left: 10%;
}
.selectClass{
    width: 220px
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
margin-left: 10px;
height: 32px;
line-height: 30px;
padding-top: 0;
padding-bottom: 0;
}
.input-new-tag {
width: 90px;
margin-left: 10px;
vertical-align: bottom;
}
</style>
           

