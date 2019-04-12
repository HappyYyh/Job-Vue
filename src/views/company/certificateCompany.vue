<template>
<div>
  <!-- 公司认证 -->
  <el-row>
        <el-col :span="20" :offset="2">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>企业认证</span>
                    <el-button style="float: right; padding: 3px 0" type="text">查看模版</el-button>
                </div>
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="企业名称" prop="companyName">
                        <el-input v-model="form.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="企业logo">
                        <el-upload
                            class="upload-demo"
                            action="http://localhost:8888/file/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="1"
                            :file-list="fileList"
                            :on-exceed="handleExceed"
                            :on-success="getUrl"
                            >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                    </el-form-item>
                    <el-form-item v-show="false"><el-input v-model="form.img" type="hidden"></el-input></el-form-item>
                    <el-form-item label="企业简介">
                        <el-input type="textarea" :rows="2" placeholder="请输入企业简介" v-model="form.introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="所属地区">
                         <el-cascader :options="options" :props="props" v-model="selectedOptions" @change="handleChange" separator="-"></el-cascader>
                         <el-input v-show="false"  v-model="form.belongPlace"></el-input>
                    </el-form-item>
                    <el-form-item label="注册资金" prop="registeredCapital">
                        <el-input v-model.number="form.registeredCapital"><template slot="append">万</template></el-input>
                    </el-form-item>
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item title="标签信息" name="1">
                        <el-form-item label="行业分类">
                          <el-radio-group v-model="form.industryCategory">
                           <el-radio :label="item.value" v-for="(item,index) in industryCategory" :key="index">{{item.name}}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="融资状态">
                          <el-radio-group v-model="form.financingStatus">
                            <el-radio :label="item.value" v-for="(item,index) in financingStatus" :key="index">{{item.name}}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="公司规模">
                          <el-radio-group v-model="form.staffNum">
                           <el-radio :label="item.value" v-for="(item,index) in staffNum" :key="index">{{item.name}}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-collapse-item>
                    </el-collapse>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即认证</el-button>
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
        industryCategory:'',
        financingStatus:'',
        staffNum:'',
        form: {
          recruiterId:'',
          companyName: '',
          img:'',
          introduce:'',
          belongPlace:'',
          registeredCapital:'',
          industryCategory:'',
          financingStatus:'',
          staffNum:'',
        },
        rules: {
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
          ],
          registeredCapital:[
            {type: 'number', message: '请输入数字', trigger: 'blur' }
          ]
        },  
        fileList: [],
        options:[],
        props:{
          label:'name',
          value:'name',
          children:'child'
        },
        selectedOptions: [],
        activeName: '0',
      }
    },
    created () {
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
        this.options = options;
      })
    },
    mounted(){
      this.industryCategory = this.$store.state.industryCategory
      this.financingStatus = this.$store.state.financingStatus
      this.staffNum = this.$store.state.staffNum
      //转换
      // api.getAllCategory().then(res=>{
      //   console.log(res.data)
      //   let categorys = res.data;
      //   let props = []
      //   categorys.forEach((first,index) => {
      //     props.push({
      //       value:first.firstName,
      //       lable:first.firstId,
      //       children:[]
      //     })
      //     first.jobSecondCategoryResponseList.forEach((second,ind)=>{
      //       props[index].children.push({
      //         value:second.secondName,
      //         lable:second.secondId,
      //         children:[]
      //       })
      //       second.jobThirdCategoryResponseList.forEach((third)=>{
      //         props[index].children[ind].children.push({
      //           value:third.thirdName,
      //         })
      //       })
      //     })
          
      //   });
      //   console.log(props)
      // })

    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
              this.form.img = response.data
          }
      },
      handleChange(value) {
        this.form.belongPlace = value.join("-");
        console.log(this.form.belongPlace)
      },
      onSubmit() {
        let user = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
        this.form.recruiterId = user.id;
        console.log(this.form)
        api.companyCertificate(this.form)
           .then(res=>{
             if(res.success){
               this.$notify({
                  title: '成功',
                  message: '企业认证成功',
                  type: 'success'
              });
             }else{
               this.$notify.error({
                  title: '认证失败',
                  message: res.message,
              });
             }
           })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="scss" scoped>
.box-card {
    width: 80%;
    margin-left: 10%;
}
</style>
           

