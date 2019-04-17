<template >
    <el-row >
        <el-col :span="16" :offset="4">
            <div class="main">
                <el-card class="box-card left">
                    <div slot="header" class="clearfix">
                        <span>已有公司?</span>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="企业名称">
                            <el-col :span="12">
                                <el-autocomplete
                                class="inline-input"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入企业名称"
                                v-model="form.companyName"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                                ></el-autocomplete>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="职位名称">
                            <el-input class="inline-input" v-model="form.position" placeholder="请输入职位名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                         <el-button type="primary" @click="onSubmit">绑定</el-button>
                         </el-form-item>
                    </el-form>
                </el-card>
                <el-card class="box-card right">
                    <div slot="header" class="clearfix">
                        <span>没有公司?</span>
                    </div>
                    <div style="margin-top:30px">
                        <span>立即成为公司的认证者吧！</span>
                        <router-link to="/company/certificate">
                            <el-button style="padding: 3px 0" type="text">立即认证</el-button>  
                        </router-link>
                    </div>
                   
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import api from '../../axios/api';
export default {
    data(){
        return{
            allCompanyName:[],
            form:{
                companyId:'',
                position:'',
                companyName:'',
                recruiterId:'',
            },
        }
    },
    mounted(){
        let list = [];
        api.getAllCompanyName().then(res=>{
            var data = res.data;
            data.forEach((item)=>{
                list.push({
                    id:item.id,
                    value:item.name
                })
            })
            this.allCompanyName = list
        })
        console.log(this.$store.state.currentUser)
    },
    methods:{
      querySearch(queryString, cb) {
        var allCompanyName = this.allCompanyName;
        var results = queryString ? allCompanyName.filter(this.createFilter(queryString)) : allCompanyName;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (item) => {
          return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       handleSelect(item) {
        this.form.companyId = item.id;
      },
      onSubmit(){
          let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user)
          //var user = JSON.parse(JSON.parse(localStorage.getItem('userInfo').data))
          this.form.recruiterId = userInfo.id;
          console.log(this.form);
          api.bindCompany(this.form)
             .then(res=>{
            if(res.success){
                this.$notify.success({
                    title:"绑定成功",
                    message:'请等待企业认证者审核!'
                });
                this.$router.push("/company/info")
            }     
         })
      }
    }
}
</script>

<style lang="scss" scoped>
.main{
    display: block;
    margin-top: 15%;
}
.box-card{
    width: 400px;
    height: 300px;
}
.left{
    float: left;
}
.right{
    float: right;
}
.inline-input{
    width: 230px;
}
</style>

