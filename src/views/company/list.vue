<template>
    <div>
        <el-row>
            <!-- 搜索条件 -->
            <el-col :span="16" :offset="4">
                <el-card class="filter">
                    <el-row class="filter-row">
                        <el-col :span="2" style="margin-top: 10px;">公司名称:</el-col>
                        <el-col :span="6">
                            <el-input placeholder="请输入公司名称" v-model="query.name"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button @click="queryCompany(null,null,null)">搜索</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">公司地点:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:placeAcitve===ind}" v-for="(item,ind) in hotCity" :key="ind" @click="queryCompany(ind,item,0)">{{item}}</a>
                            <input v-show="false" v-model="query.place"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">行业类型:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:industryCategoryAcitve===null}" @click="queryCompany(null,null,1)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:industryCategoryAcitve===ind}" v-for="(item,ind) in industryCategory" :key="ind" @click="queryCompany(ind,item.value,1)">{{item.name}}</a>
                            <input v-show="false" v-model="query.industryCategory"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">融资阶段:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:financingStatusAcitve===null}" @click="queryCompany(null,null,2)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:financingStatusAcitve===ind}" v-for="(item,ind) in financingStatus" :key="ind" @click="queryCompany(ind,item.value,2)">{{item.name}}</a>
                            <input v-show="false" v-model="query.financingStatus"/>
                        </el-col>
                    </el-row>
                    <el-row class="filter-row">
                        <el-col :span="2">公司规模:</el-col>
                        <el-col :span="22">
                            <a href="javascript:void(0)" :class="{selected:staffNumAcitve===null}" @click="queryCompany(null,null,3)">不限</a>
                            <a href="javascript:void(0)" :class="{selected:staffNumAcitve===ind}" v-for="(item,ind) in staffNum" :key="ind" @click="queryCompany(ind,item.value,3)">{{item.name}}</a>
                            <input v-show="false" v-model="query.staffNum"/>
                        </el-col>
                    </el-row>
                </el-card>    
            </el-col>
            <!-- 结果 -->
            <el-col :span="16" :offset="4" style="margin-top:15px">
                <div class="hot-company">
                    <div class="company-div" v-for="(item,index) in companyList" :key="index">
                        <a href="javascript:void(0);" class="company-info">
                            <img :src="item.img" >
                            <div class="company-text">
                                <h4>{{item.name}}</h4>
                                <p >
                                    <span v-if="item.financingStatus===0">未融资</span>
                                    <span v-if="item.financingStatus===1">天使轮</span>
                                    <span v-if="item.financingStatus===2">A轮</span>
                                    <span v-if="item.financingStatus===3">B轮</span>
                                    <span v-if="item.financingStatus===4">C轮</span>
                                    <span v-if="item.financingStatus===5">D轮及以上</span>
                                    <span v-if="item.financingStatus===6">上市公司</span>
                                    <span v-if="item.financingStatus===7">不需要融资</span>
                                <span class="vline"></span>
                                <span>
                                    <span v-for="(option,ind) in industryCategory" :key="ind" v-show="option.value===item.industryCategory">
                                    {{option.name}}
                                    </span>
                                </span>
                                </p>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="about-info">
                            <p>
                            <span style="float:left">
                                <span style="color: #00c2b3;">{{item.jobNum}}</span>个在招职位
                            </span>
                            <span style="float:right">
                                <span style="color: #00c2b3;">{{item.recruiterNum}}</span>位招聘者
                            </span>
                            </p>
                        </a>
                    </div>
                </div>
            </el-col>
            <!-- 分页 -->
            <el-col :span="16" :offset="4">
                <el-card class="pagination">
                    <el-pagination 
                        @current-change="handleCurrentChange"
                        :current-page.sync="query.pageNo"
                        :page-size="query.pageSize"
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
    data(){
       return{
           placeAcitve:0,
           industryCategoryAcitve:null,
           financingStatusAcitve:null,
           staffNumAcitve:null,
           hotCity:['全国','北京','上海','广州','深圳','杭州','天津','西安','苏州','武汉','厦门','长沙','南京','成都','重庆',],
           industryCategory:[],
           financingStatus:[],
           staffNum:[],
           query:{
               name:'',
               place:'',
               industryCategory:null,
               financingStatus:null,
               staffNum:null,
               pageSize:24,//每页的数据条数
               pageNo:1,//默认开始页面
           },
           total:null,//总记录数,
           companyList:[],//数据
       } 
    },
    created(){
         //数据回显
      this.industryCategory = this.$store.state.industryCategory;
      this.financingStatus = this.$store.state.financingStatus;
      this.staffNum = this.$store.state.staffNum;
    },
    mounted(){
        this.queryCompany(null,null,null);
    },
    methods:{
        handleCurrentChange(val) {
            this.query.pageNo = val;
            this.queryCompany(null,null,null)
        },
        queryCompany(index,value,type){
            if(type === 0){
                if(value==='全国'){
                    this.query.place = '';
                }else{
                    this.query.place = value;
                }
                this.placeAcitve = index;
            }
            if(type === 1){
                this.industryCategoryAcitve = index;
                this.query.industryCategory = value;
            }
            if(type === 2){
                this.financingStatusAcitve = index;
                this.query.financingStatus = value;
            }
            if(type === 3){
                this.staffNumAcitve = index;
                this.query.staffNum = value;
            }
            api.queryCompany(this.query)
            .then(res=>{
                this.total = res.data.total
                this.companyList = res.data.list
                console.log(this.companyList)
            })
            
        }
    },
    
}
</script>

<style lang="scss" scoped>
.filter{
    padding-left: 10px
}
.filter-row{
    margin-top: 15px;
    font-size: 15px
}
.filter-row a{
    display: inline-block;
    margin-right: 6px;
    padding: 1px 8px 0;
    // color: #61687c;
}
.selected{
    color: #00c2b3;
}

//热门公司
.hot-company{
    margin-top: 40px;
    display: block;
    font-weight: 400;
    background: #fff;
    width: 100%;
    height: 832px;
    border-top: solid 2px bisque;
}
.hot-company .company-div{
    display: block;
    border-left: solid 2px #f6f6f8;
    border-bottom: solid 2px #f6f6f8;
    height: 16.66666667%;
    margin-left: -2px;
    width: 24.9%;
    float:left;
}

.company-info{
    height: 75px;
    width: 205px;
    margin: 0 auto 0 auto;
    padding-top: 20px;
    border-bottom: dashed 1px #ededed;
    display: block;
}
.company-info img{
    height: 55px;
    width: 55px;
    float: left;
    border-radius: 10px;
    border: solid 1px #f2f5fa;
}
.company-text{
    margin-left: 65px;
    height: 65px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
}
.company-text h4{
    margin: 0;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.company-text p{
    height: 40px;
    line-height: 41px;
    color: #898e9d;
    font-size: 12px;
    display: inline-block;
    white-space: nowrap;
}

.about-info{
    color: #8d92a1;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    display: block;
}
.about-info p {
  width: 205px;
  margin: 0 auto;
}
.pagination{
    text-align: center
}
</style>
