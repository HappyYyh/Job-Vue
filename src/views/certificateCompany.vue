<template>
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
                            <el-radio label="0">民营企业</el-radio>
                            <el-radio label="1">电子商务</el-radio>
                            <el-radio label="2">游戏</el-radio>
                            <el-radio label="3">媒体</el-radio>
                            <el-radio label="4">广告营销</el-radio>
                            <el-radio label="5">数据服务</el-radio>
                            <el-radio label="6">医疗健康</el-radio>
                            <el-radio label="7">生活服务</el-radio>
                            <el-radio label="8">O2O</el-radio>
                            <el-radio label="9">旅游</el-radio>
                            <el-radio label="10">分类信息</el-radio>
                            <el-radio label="11">音乐/视频/阅读</el-radio>
                            <el-radio label="12">在线教育</el-radio>
                            <el-radio label="13">社交网络</el-radio>
                            <el-radio label="14">人力资源服务</el-radio>
                            <el-radio label="15">企业服务</el-radio>
                            <el-radio label="16">信息安全</el-radio>
                            <el-radio label="17">智能硬件</el-radio>
                            <el-radio label="18">移动互联网</el-radio>
                            <el-radio label="19">互联网</el-radio>
                            <el-radio label="20">计算机软件</el-radio>
                            <el-radio label="21">通信/网络设备</el-radio>
                            <el-radio label="22">广告/公关/会展</el-radio>
                            <el-radio label="23">互联网金融</el-radio>
                            <el-radio label="24">物流/仓储</el-radio>
                            <el-radio label="25">贸易/进出口</el-radio>
                            <el-radio label="26">咨询</el-radio>
                            <el-radio label="27">工程施工</el-radio>
                            <el-radio label="28">汽车生产</el-radio>
                            <el-radio label="29">其他行业</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="融资状态">
                          <el-radio-group v-model="form.financingStatus">
                            <el-radio label="0">未融资</el-radio>
                            <el-radio label="1">天使轮</el-radio>
                            <el-radio label="2">A轮</el-radio>
                            <el-radio label="3">B轮</el-radio>
                            <el-radio label="4">C轮</el-radio>
                            <el-radio label="5">D轮及以上</el-radio>
                            <el-radio label="6">上市公司</el-radio>
                            <el-radio label="7">不需要融资</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="公司规模">
                          <el-radio-group v-model="form.staffNum">
                            <el-radio label="0">少于15人</el-radio>
                            <el-radio label="1">15-50人</el-radio>
                            <el-radio label="2">50-150人</el-radio>
                            <el-radio label="3">150-500人</el-radio>
                            <el-radio label="4">500-2000人</el-radio>
                            <el-radio label="5">2000人以上</el-radio>
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
           
               
</template>
<script>
import api from '../axios/api.js'
export default {
    data() {
      return {
        form: {
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
          children:'children'
        },
        selectedOptions: [],
        activeName: '0',
      }
    },
    mounted(){
      api.getAllRegions().then(res=>{
        this.options =res.data;
        //console.log(this.options);
      })
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
           

