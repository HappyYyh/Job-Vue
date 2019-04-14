<template>
<div>
  <!-- 发布职位 -->
  <el-row>
      <el-col :span="20" :offset="2">
          <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <span>职位列表</span>
                  <router-link to="/job/addJob">
                    <el-button style="float: right; padding: 3px 0" type="text">新增职位</el-button>
                  </router-link>
              </div>
              <!-- 表格 -->
              <el-table :data="recruitersJobList" border style="width: 100%">
                <el-table-column fixed prop="jobName" label="职位名称"  width="160"/>
                <el-table-column prop="category" label="分类" width="200"/>
                <el-table-column prop="workPlace" label="工作地点" width="180"/>
                <el-table-column label="学历要求" width="100">
                  <template slot-scope="scope">
                    <span v-for="(item,index) in workEducationList" v-show="scope.row.workEducation===item.value" :key=index>
                      {{item.label}}
                    </span>  
                  </template>
                </el-table-column>  
                <el-table-column label="薪资待遇" width="140">
                  <template slot-scope="scope">
                    {{scope.row.salaryStart}}K —— {{scope.row.salaryEnd}}K
                  </template>
                </el-table-column>
                <el-table-column prop="welfare" label="福利待遇" width="400"/>
                <el-table-column label="招聘状态" width="80">
                  <template slot-scope="scope">
                    {{scope.row.status ===0?'停止':'开始'}}
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="queryDetail(scope.row)" type="text" size="small">查看详情</el-button>
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
            <!-- 对话框 -->
            <el-dialog title="职位详情" :visible.sync="dialogVisible" width="60%">
                  <el-form ref="detail" :model="detail" label-width="80px">
                  <el-form-item label="职位名称:">
                      <span>{{detail.jobName}}</span>
                  </el-form-item>
                  <el-form-item label="职位分类:">
                      <span>{{detail.category}}</span>
                  </el-form-item>
                  <el-form-item label="工作地点:">
                      <span>{{detail.workPlace}}</span>
                  </el-form-item>
                  <el-form-item label="学历要求:">
                    <span v-for="(item,index) in workEducationList" v-show="detail.workEducation===item.value" :key=index>
                      {{item.label}}
                    </span>  
                  </el-form-item>
                  <el-form-item label="薪资范围:">
                      <span>{{detail.salaryStart}}-{{detail.salaryEnd}}K</span>
                  </el-form-item>
                  <el-form-item label="福利待遇:">
                      <el-tag v-for="(item,index) in detail.welfareList" :key="index" style="margin-left:5px">{{item}}</el-tag>
                  </el-form-item>
                  <el-form-item label="职位状态:">
                      <span>{{detail.status===0?'暂停招聘':'招聘中'}}</span>
                  </el-form-item>
                  <el-form-item label="工作职责:">
                    <p v-for="(item,ind) in detail.jobDutyList" :key="ind" style="line-height: 20px;">{{item}}</p>
                  </el-form-item>
                  <el-form-item label="工作要求:">
                    <p v-for="(item,ind) in detail.jobRequirementList" :key="ind" style="line-height: 20px;">{{item}}</p>
                  </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
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
        recruiterId:'',
        recruitersJobList:[{
          jobName:'',
          category:'',
          workPlace:'',
          workEducation:'',
          salaryStart:'',
          salaryEnd:'',
          welfare:'',
          status:''
        }],
        //详情
        detail:{
          jobName:'',
          category:'',
          workPlace:'',
          workEducation:'',
          salaryStart:'',
          salaryEnd:'',
          welfareList:[],
          status:'',
          jobDutyList:[],
          jobRequirementList:[],
          test:""
        },
        welfareList:[],
        pageSize:8,//每页的数据条数
        currentPage:1,//默认开始页面
        total:null,//总记录数
        dialogVisible:false,//详情对话框
      }
    },
    created () {
      this.workEducationList = this.$store.state.workEducation;
      let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
      this.recruiterId = userInfo.id;
    },
    mounted(){
      this.queryList(this.currentPage)
    },
    methods: {
      queryList(pageNo){
        api.recruitersJobList({
          pageNo,
          pageSize:this.pageSize,
          recruiterId:this.recruiterId
        }).then(res=>{
          this.recruitersJobList = res.data.list
          this.total = res.data.total
        })
      },
      queryDetail(row){
        this.detail = row;
        this.detail.welfareList = row.welfare.split("/");
        //把换行符替换然后分割 再拼接成数组
        this.detail.jobDutyList = row.jobDuty.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
        this.detail.jobRequirementList= row.jobRequirement.replace(/(\r\n|\n|\r)/gm, "<br/>").split("<br/>");
        this.dialogVisible = true
        console.log(this.detail.jobDutyList)
      },
      handleCurrentChange(val) {
        this.queryList(val)
      },
    }
}
</script>
<style lang="scss" scoped>
.box-card {
    width: 80%;
    margin-left: 10%;
}
.el-pagination{
  float: right;
}

</style>
           

