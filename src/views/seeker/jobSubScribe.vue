<template>
    <div>
        <el-row>
            <el-col :span="12" :offset="6">
                <el-card shadow="never" class="card">
                    <div class="title">
                        我的职位订阅
                    </div>
                    <!-- 查询 -->
                    <div v-show="!edit" class="showMyScribute">
                        <div>
                            职位名称
                            <span class="name">{{mySubScribe.jobCategory}}</span>
                        </div>
                        <div>
                            城市地点
                            <span class="city">{{mySubScribe.workCity}}</span>
                        </div>
                        <div>
                            <el-button type="primary" @click="toUpd">修改</el-button>
                            <el-button type="danger" @click="del">删除</el-button>
                        </div>
                    </div>
                    <!-- 修改或者编辑 -->
                    <div v-show="edit">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="职位名称">
                                <el-cascader :options="options1" class="cascaderClass" :show-all-levels="false" :props="props1" v-model="selectedOptions1" @change="handleCategoryChange" placeholder="请选择职位分类"></el-cascader>
                                <el-input v-show="false"  v-model="form.jobCategory"></el-input>
                            </el-form-item>
                            <el-form-item label="城市地点">
                                <el-radio-group v-model="form.workCity">
                                    <el-radio-button label="上海"></el-radio-button>
                                    <el-radio-button label="北京"></el-radio-button>
                                    <el-radio-button label="广州"></el-radio-button>
                                    <el-radio-button label="深圳"></el-radio-button>
                                    <el-radio-button label="杭州"></el-radio-button>
                                    <el-radio-button label="南京"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                             <el-form-item>
                                <el-button type="primary" @click="onSubmit()">{{form.id===null?'订阅':'修改'}}</el-button>
                                <el-button v-show="form.id!=null" @click="edit = false">取消</el-button>
                            </el-form-item>
                        </el-form>
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
            edit:false,
            mySubScribe:{
                id:null,
                userId:null,
                jobCategory:'',
                workCity:'',
            },
            form:{
                id:null,
                userId:null,
                jobCategory:'',
                workCity:'',
            },
            //级联选择器相关属性
            options1:[],
            props1:{
                label:'value',
                value:'value',
                children:'children'
            },
            selectedOptions1: [],
        }
    },
    created(){
        let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
        this.form.userId = userInfo.id
    },
    mounted(){
        this.queryCategory();
        this.queryMySubScribe();
    },
    methods:{
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
        this.form.jobCategory = value.join("/");
      },
      //查询
      queryMySubScribe(){
          api.getJobSubScribe({userId:this.form.userId})
          .then(res=>{
              if(res.data === null){
                  this.edit = true;
              }else{
                this.mySubScribe = res.data
                let categorys = res.data.jobCategory.split("/")
                this.selectedOptions1 = categorys;
                this.mySubScribe.jobCategory = categorys[2]
              }
          })
      },
      toUpd(){
          this.edit = true;
          this.form = {...this.mySubScribe};
      },
      del(){
          this.$confirm('即将删除订阅, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                api.delJobSubScribe({id:this.mySubScribe.id})
                .then(res=>{
                    if(res.success){
                        window.location.href = "/seeker/jobSubScribe";
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      onSubmit(){
        if(this.form.id ===null){
            //新增
            api.addJobSubScribe(this.form)
            .then(res=>{
                if(res.success){
                    window.location.href = "/seeker/jobSubScribe";
                }
            })
        }else{
            //修改
            api.updateJobSubScribe(this.form)
            .then(res=>{
                if(res.success){
                    let showCategory = {...this.form.jobCategory.split("/")}
                    this.mySubScribe.jobCategory = showCategory[2]
                    this.mySubScribe.workCity = this.form.workCity
                    this.edit = false;
                }
            })
        }
      }
    }
}
</script>
<style lang="scss" scoped>
.card{
    padding: 0 30px;
}
.title{
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    margin-left: 10px;
}
.showMyScribute{
    margin-left: 10px;
    padding: 10px 0 20px 0;
}
.showMyScribute div{
    margin-bottom: 20px;
}
.showMyScribute span{
    margin-left: 20px;
    font-weight: 600;
    font-size: 16px;
}
.cascaderClass{
    width: 250px;
}
</style>
