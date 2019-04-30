<template>
    <div>
        <el-row>
            <el-col :span="12" :offset="6">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="投递成功" name="first">
                        
                    </el-tab-pane>
                    <el-tab-pane label="被查看" name="second"></el-tab-pane>
                    <el-tab-pane label="邀请面试" name="third"></el-tab-pane>
                    <el-tab-pane label="不合适" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="result" >
                    <div class="send-primary clear" v-for="(send,index) in seekerJobSendList" :key="index">
                        <div class="clear">
                            <a href="javascript:void(0)" @click="toJobDetail(send.jobId)">
                                <span class="name">{{send.jobName}} </span>
                                <span class="salary" v-show="send.salaryStart !==null && send.salaryEnd!=null">({{send.salaryStart}}K - {{send.salaryEnd}}K) </span>
                            </a>
                        </div>
                        <div class="clear">
                            <div class="company">
                                <a href="javascript:void(0)" @click="toCompanyDetail(send.companyId)">
                                    {{send.companyName}}
                                    <span class="city">
                                        [{{send.city}}]
                                    </span>
                                </a>
                            </div>
                            <div class="time">
                                {{send.showTime}}&nbsp;&nbsp;&nbsp;{{activeName==='first'?'投递成功':activeName==='second'?'被查看':activeName==='third'?'邀请面试':'不合适'}}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination 
                        background
                        @current-change="handleCurrentChange"
                        :current-page.sync="pageNo"
                        :page-size="pageSize"
                        layout="prev, pager, next,total"
                        :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/axios/api';
export default {
    data(){
        return{
            activeName:'first',
            userId:null,
            pageNo:1,
            pageSize:5,
            total:null,
            type:0,
            seekerJobSendList:[],
        }
    },
    created(){

    },
    mounted(){
        if(localStorage.getItem('userInfo') === null){
            this.$message({
                type:'warning',
                message:'请先登陆再操作'
            })
            //未登陆则先登陆
            this.$router.replace({
                path:'/login',
                //登陆成功后跳回当前页面
                query:{redirect: this.$router.currentRoute.fullPath}
            })
        }else{
            let userInfo = JSON.parse(JSON.parse(localStorage.getItem('userInfo')).user);
            this.userId = userInfo.id
        }
        this.querySend(0)   
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
        handleClick(tab, event) {
            let type = Number(tab.index);
            this.type = type;
            this.pageNo = 1;
            this.querySend(type)
        },
        handleCurrentChange(val){
            this.pageNo = val;
            this.querySend(this.type);
        },
        querySend(type){
            api.seekerJobSendList({
                pageNo:this.pageNo,
                pageSize:this.pageSize,
                userId:this.userId,
                type
            }).then(res=>{
                this.total = res.data.total;
                this.seekerJobSendList = res.data.list;
            })
        },
        //跳转到职位详情
        toJobDetail(jobId){
            this.$router.push({
                name:'jobDetail',
                params:{jobId}
            })
        },
        //跳转到公司详情
        toCompanyDetail(companyId){
            this.$router.push({
                name:'companyDetail',
                params:{companyId}
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.send-primary{
    height: 50px;
    padding: 15px 16px;
    margin-bottom: 20px;
    border: 1px solid #ededed;
    font-size: 16px;
}
.name{
    font-size: 18px;
    color: #0d9572;
}
.salary{
    font-size: 16px;
    color: #e6775c;
    margin-left: 20px;
}
.company{
    float: left;
    color: #555;
    margin: 5px 0;
}
.city{
    color: #999;
    margin-left: 10px;
}
.time{
    float: right;
    color: #999;
    font-size: 14px;
}
.pagination{
    text-align: center
}
</style>
