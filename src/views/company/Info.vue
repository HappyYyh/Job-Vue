<template>
<div>
  <!-- 公司信息修改 -->
  <el-row v-show="canUpdate">
      <el-col :span="20" :offset="2">
        <el-card class="box-card-update">
          <div slot="header" class="clearfix">
              <span>企业修改</span>
              <el-button style="float: right; padding: 3px 0" @click="toInfo" type="text">信息预览</el-button>
          </div>
          <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item label="企业名称" prop="companyName">
                  <el-input v-model="form.companyName" readonly></el-input>
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
                      list-type="picture"
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
              <el-form-item label="招聘情况todo">
                <el-radio-group v-model="form.isStop">
                  <el-radio-button label="继续"></el-radio-button>
                  <el-radio-button label="停止"></el-radio-button>
                </el-radio-group>
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
                  <el-button type="primary" @click="onSubmit">修改</el-button>
              </el-form-item>
          </el-form>
        </el-card> 
      </el-col>
  </el-row>
  <!-- 公司信息显示 -->
  <el-row v-show="showInfo">
      <el-col :span="22" :offset="2">
        <!-- 公司基本信息 -->
        <el-card class="" v-bind:class="{defaultLeft:!canReview, reviewLeft:canReview }">
          <div slot="header" class="clearfix">
              <span>企业信息</span>
          </div>
          <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item label="企业名称:">
                  <span>{{Info.companyName}}</span>
              </el-form-item>
              <el-form-item label="企业logo:">
                  <img :src="Info.img" alt="" class="company-img">
              </el-form-item>
              <el-form-item label="企业简介:">
                  <span>{{Info.introduce}}</span>
              </el-form-item>
              <el-form-item label="所属地区:">
                  <span>{{Info.belongPlace}}</span>
              </el-form-item>
              <el-form-item label="注册资金:">
                  <span>{{Info.registeredCapital}}万</span>
              </el-form-item>
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="标签信息" name="1">
                  <el-form-item label="行业分类:">
                      <span v-for="(item,index) in industryCategory" :key="index" v-show="Info.industryCategory ===item.value">{{item.name}}</span>
                  </el-form-item>
                  <el-form-item label="融资状态:">
                      <span v-for="(item,index) in financingStatus" :key="index" v-show="Info.financingStatus ===item.value">{{item.name}}</span>
                  </el-form-item>
                  <el-form-item label="公司规模:">
                      <span v-for="(item,index) in staffNum" :key="index" v-show="Info.staffNum ===item.value">{{item.name}}</span>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
              <el-form-item>
                  <el-button type="primary" @click="toUpdate">信息修改</el-button>
              </el-form-item>
          </el-form>
        </el-card> 
        <!-- 招聘者信息 -->
        <el-card class="" v-bind:class="{ defaultRight:!canReview,reviewRight:canReview}">
          <div slot="header" class="clearfix">
            <span>绑定审核</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
              <el-table :data="recruiterList" border style="width: 100%">
                <el-table-column fixed prop="nickName" label="昵称"  width="80"/>
                <el-table-column prop="phone" label="手机号" width="120"/>
                <el-table-column prop="email" label="邮箱" width="170"/>
                <el-table-column prop="position" label="岗位" width="80"/>
                <el-table-column label="绑定状态" width="80">
                  <template slot-scope="scope">
                    {{scope.row.status ===0?'否':'是'}}
                  </template>
                </el-table-column>
               <el-table-column  label="修改权限" width="80">
                  <template slot-scope="scope">
                    {{scope.row.canUpdate ===0?'无':'有'}}
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" @click="agreeBind(scope.row.recruiterId)" v-show="scope.row.status ===0" size="small">绑定</el-button>
                    <div v-show="scope.row.status ===1">
                        <el-button type="text" @click="givePre(scope.row.recruiterId)" v-show="scope.row.canUpdate===0" size="small">给予权限</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next,total"
                :total="total">
              </el-pagination>
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
        canUpdate:false,
        showInfo:true,
        Info:{
          id:null,
          belongPlace: '',
          companyName: '',
          financingStatus: '',
          img: '',
          industryCategory: '',
          introduce: '',
          registeredCapital: '',
          staffNum: '',
          isStop:null,
          recruiterId:null,
          canUpdate:null,
          isOwner:null,
          status:null,
        },
        form: {
          id:null,
          companyName: '',
          img:'',
          introduce:'',
          belongPlace:'',
          isStop:null,
          registeredCapital:'',
          industryCategory:'',
          financingStatus:'',
          staffNum:'',
        },
        recruiterList:[{
          phone:"",
          email:"",
          nickName:"",
          position:"",
          recruiterId:"",
          canUpdate:"",
          status:"",
        }],
        rules: {
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
          ],
          registeredCapital:[
            {type: 'number', message: '请输入数字', trigger: 'blur' }
          ]
        },  
        fileList: [{name:'',url:''}],
        options:[],
        props:{
          label:'name',
          value:'name',
          children:'child'
        },
        selectedOptions: [],
        activeName: '0',
        canReview:false,//能否显示审核模块
        pageSize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        total:null,//总记录数
      }
    },
    created () {
      this.industryCategory = this.$store.state.industryCategory
      this.financingStatus = this.$store.state.financingStatus
      this.staffNum = this.$store.state.staffNum
    },
    mounted(){
      //查询公司信息
      let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user)
      let recruiterId = userInfo.id
      console.log(recruiterId)
      api.getCompanyInfoByRecruiterId({recruiterId})
          .then(res=>{
            if(res.data === null){
              this.$message({
                message: '您尚未绑定公司!',
                type: 'warning'
              })
              this.$router.push("/recruiter/firstLogin")
            }else{
              if(res.data.status === 0 ){
                this.$notify.info({
                  title: "请耐心等待",
                  message: '您的绑定申请正在审核中',
              });
              }else{
                  this.Info = res.data;
                  if(res.data.isOwner === 1){
                    this.canReview = true;
                    this.queryRecruiterList(this.currentPage)
                  }
              }
            }
          });
      
    },
    methods: {
      toInfo(){
        this.canUpdate = false;
        this.showInfo = true;
      },
      toUpdate(){
        this.canUpdate =this.Info.canUpdate;
        if(this.canUpdate){
          this.showInfo=false;
          this.form = this.Info;
          this.fileList[0].url = this.Info.img;
          this.selectedOptions = this.form.belongPlace.split("-");
          console.log(this.form)
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
        }else{
          this.$message({
          message: '对不起，您尚未拥有权限修改公司信息，请联系公司认证者获取权限!',
          type: 'warning'
        });
        }
      },
      // eslint-disable-next-line no-unused-vars
      handleRemove(file, fileList) {
        var url = this.form.img;
        api.fileDelete({url}).then(res=>{
          if(res.success){
            this.form.img = '';
          }
        })
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
        api.companyUpdate(this.form)
           .then(res=>{
             if(res.success){
               this.$notify({
                  title: '成功',
                  message: '企业信息修改成功',
                  type: 'success'
              });
                this.canUpdate = false;
                this.showInfo = true;
             }else{
               this.$notify.error({
                  title: '修改失败',
                  message: res.message,
              });
             }
           })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleCurrentChange(val) {
        this.queryRecruiterList(val)
      },
      queryRecruiterList(pageNo){
        api.getRecruiters({
            pageNo:pageNo,
            pageSize:this.pageSize,
            companyId:this.Info.id
        }).then(response=>{
            console.log("当前页码数",this.currentPage)
            this.recruiterList = response.data.list
            this.total = response.data.total
          })
      },
      agreeBind(recruiterId){
        api.updateRecruiterInfo({
          companyId:this.Info.id,
          recruiterId,
          updateType:0
        // eslint-disable-next-line no-unused-vars
        }).then(res=>{
          this.$notify.success({
              title: '成功',
              message: '绑定成功',
          })
          this.queryRecruiterList(this.currentPage)
        })
      },
      givePre(recruiterId){
        api.updateRecruiterInfo({
          companyId:this.Info.id,
          recruiterId,
          updateType:1
        // eslint-disable-next-line no-unused-vars
        }).then(res=>{
          this.$notify.success({
              title: '成功',
              message: '绑定成功',
          })
          this.queryRecruiterList(this.currentPage)
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.defaultLeft {
    width: 72%;
    margin-left: 8.7%;
}
.defaultRight{
    display: none
}
.reviewLeft{
    width: 55%;
    float: left;
}
.reviewRight{
    width: 40%;
    float: right;
    margin-left: 4.5%
}
.box-card-update{
  width: 80%;
  margin-left: 10%;
}
.company-img{
    width: 130px;
    height: 130px;
}
.el-pagination{
  float: right;
}
</style>
           

