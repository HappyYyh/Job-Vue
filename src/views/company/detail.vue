<template>
    <div>
        <el-row >
            <el-col :span="18" :offset="3">
                <el-card class="top">
                    <el-row>
                       <!-- 图片 -->
                        <el-col :span="4">
                            <img :src="companyDetail.img" class="img">
                        </el-col>
                        <el-col :span="19" :offset="1">
                             <!-- 名称 -->
                            <el-row class="name">{{companyDetail.companyName}}</el-row>
                             <!-- 标签 -->
                            <el-row style="margin-top:10px">
                                <p class="label">
                                    <span>  
                                        <span v-for="(it,ind) in financingStatus" :key="ind" v-show="it.value === companyDetail.financingStatus">
                                            {{it.name}}
                                        </span>
                                    </span>
                                    <em class="vline"></em>
                                        <span v-for="(it,ind) in staffNum" :key="ind" v-show="it.value === companyDetail.staffNum">
                                            {{it.name}}
                                        </span>
                                    <em class="vline"></em>
                                     <span>
                                        <span v-for="(it,ind) in industryCategory" :key="ind" v-show="it.value === companyDetail.industryCategory">
                                            {{it.name}}
                                        </span>
                                    </span>
                                </p>
                            </el-row>
                            <!-- 福利标签 -->
                            <el-row>
                                <el-col style="margin-top:15px">
                                    
                                    <el-tag class="welfare"  v-for="(item,ind) in welfareList" :key="ind" v-show="ind<=7">{{item}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/axios/api';
export default {
    data(){
        return{
            id:this.$route.params.companyId,
            companyDetail:{},
            welfareList:[],
            industryCategory:[],
            financingStatus:[],
            staffNum:[],
        }
    },
    created(){
        this.industryCategory = this.$store.state.industryCategory;
        this.financingStatus = this.$store.state.financingStatus;
        this.staffNum = this.$store.state.staffNum;
    },
    mounted(){
        if(this.id === undefined || this.id === null){
            this.$message({
                type:'error',
                message:'企业详情查询失败,请重试!'
            })
            this.$router.push('/company/list');
        }else{
            this.queryCompanyDetail();
        }
    },
    methods:{
        queryCompanyDetail(){
            api.queryCompanyDetail({id:this.id})
            .then(res=>{
                if(res.welfares !==null){
                    this.welfareList = res.data.welfares.split("/")
                }
                console.log(this.welfareList)
                console.log(res)
                this.companyDetail = res.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.top{
    margin-top: 30px;
}
.top .img{
    width: 164px;
    height: 164px;
    border-right: 1px solid #eaeaea;
}
.vline {
    display: inline-block;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
}
.name{
    font-size: 20px;
    font-weight: 400;
}
.label{
    font-size: 14px;
}
.welfare{
    min-width: 80px;
    text-align: center;
    // margin-right: 6px;
}
</style>
