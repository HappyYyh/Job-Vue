<template>
<el-container>
  
  <el-main>
        <div class="main">
    <!-- 搜索框 -->
        <div style="margin-top: 50px;" class="search-input">
            <el-input placeholder="搜索公司、职位" v-model="input5" class="input-with-select" >
                <el-select v-model="select" slot="prepend" placeholder="职位类型">
                <el-option label="Java" value="1"></el-option>
                <el-option label="前端" value="2"></el-option>
                <el-option label="产品经理" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <!-- 左侧职业选择框 -->
        <div class="job-menu">
          <div class="left">
            <div v-for="(jobFirst,index) in jobCategory" :key="index" @mouseover.prevent="handelOver(index)" @mouseout="handelOut" v-show="index<12">
              <div class="active">
                <a href="#" class="firstCategory">{{jobFirst.firstName}}</a>
                <span>
                  <a href="#" class="hotCategory">Java</a>
                  <a href="#" class="hotCategory">Web</a>
                  <a href="#" class="hotCategory">PHP</a>
                </span>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="showMore">
                <span>查看更多职位</span>
            </div>
          </div>
          <!-- 右侧图片 -->
          <div class="rightImg">
              <img src="http://image.yangyhao.top/images/jpg/3.jpg">
          </div>
          <!-- 右侧隐藏区域 -->
          <div class="rightWrap" @mouseover="handelOver(index)" @mouseout="handelOut"  v-for="(jobSecond, index) in secondList" :key="index" v-show="index<12 && index === showRight">
            <div class="secondList">
              <div class="jobSecond" v-for="(item,ind) in jobSecond" :key="ind">
                <div class="secondArea">
                  <span>{{item.secondName}}</span>
                </div>
                <div class="thirdArea">
                  <span class="thirdName" v-for="jobThird in item.jobThirdCategoryResponseList" :key="jobThird.index">{{jobThird.thirdName}}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    <!-- 职位栏 -->
        <div class="hot-job">
           <div class="sub-div" v-for="(item,index) in hotJob" :key="index">
               <a href="javascript:void(0);" class="job-info">
                   <p>
                       高级架构师
                       <span class="salary">25-35k</span>
                   </p>
                   <p class="job-text">
                       北京
                       <span class="vline"></span>
                       10年以上
                       <span class="vline"></span>
                       本科
                   </p>
               </a>
               <a href="javascript:void(0);" class="user-info">
                    <p style="margin-top:7px">
                        <img src="http://image.yangyhao.top/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg" alt="">
                        <span class="user-text">
                            荣先生
                            <span class="vline"></span>
                            招聘者
                        </span>
                    </p>
               </a>
           </div>
           
        </div>
    <!-- 公司栏 -->
        <div class="hot-company">
            <div class="company-div" v-for="(item,index) in hotCompany" :key="index">
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
            <div class="more-tab">
              <el-button style="width:300px" href="javascript:void(0);">查看更多</el-button>
            </div>
        </div>
    </div>
  </el-main>
  
</el-container>

</template>
<script>
import api from '../axios/api';
  export default {
    data() {
      return {
        input5: '',
        select: '',
        jobCategory:[],
        secondList: [],
        showRight: '',
        hotJob:[1,2,3,4,5,6],
        hotCompany:[],
        industryCategory:[],
        financingStatus:[],
      };
    },
    created(){
      //查询职位选项
      api.getAllCategory()
        .then(res =>{
            this.jobCategory= res.data;
            this.secondList = res.data.map((item)=>item.jobSecondCategoryResponseList);
        })
      //数据回显
      this.industryCategory = this.$store.state.industryCategory;
      this.financingStatus = this.$store.state.financingStatus
    },
    mounted(){
      //查询公司信息
      this.queryCompany();
      
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handelOver(id){
        this.showRight = id;
      },
      handelOut(){
        this.showRight = '';
      },
      queryCompany(){
        api.queryCompany({
          pageNo:0,
          pageSize:12
        }).then(res=>{
          this.hotCompany = res.data.list
          console.log(res.data)
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
// main
.main {
    padding: 20px 12% ;
}

.search-input{
    padding: 0 5%;
}

.el-select {
    width: 130px;
}

// 左侧职业选择栏
.job-menu{
  margin-top: 40px;
  position: relative;
  height: 600px;
}
.job-menu .left {
  float:left;
  width: 320px;
  background: #fff;
  box-shadow: 5px 5px 15px rgba(3,0,0,.04);
}
.job-menu .left div{
  line-height: 40px;
    padding: 0px;
    margin: 0px;
    height: 40px;
}

.job-menu .left .active:hover{
    //#5cc9b4
   background: bisque;
  .firstCategory,.hotCategory{
    color: #fff;
  }
}
.showMore{
    text-align: center;
    color: #999;
    border-top: solid 1px #f5f6f9;
}
.rightWrap{
  position: absolute;
  left: 320px;
  top: 0;
  width:700px;
  box-sizing: border-box;
  z-index:1;
  padding: 40px;
  min-height: 480px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(6,0,1,.1);
}
.rightImg{
  position: absolute;
  left: 340px;
  top: 0;
}
.rightImg img{
    width: 700px;
    height: 480px;
}
.secondArea{
  width: 25%;
  float: left;
  line-height: 30px;
  color: #999;
  font-size: 14px;
}
.thirdArea{
  width: 68%;
  float: left;
  line-height: 30px;
  border-bottom: solid 1px #f5f6f9;
  padding: 0 0 10px 1px;
  color: #61687c;
}
.thirdName{
  font-size: 14px;
  line-height: 30px;
  margin-right: 20px;
}
.firstCategory{
    color: #414a60;
    font-size: 16px;
    font-weight: bold;
    margin-left: 18px;
    margin-top: 5px;
}
.hotCategory{
    color: #666666;
    font-size: 14px;
    margin-left: 20px;
    color: #999;
}
.el-icon-arrow-right{
    float: right;
    color:#666;
    margin: 10px;
}

//热门职业
.hot-job{
    margin-top: 40px;
    display: block;
    background: #fff;
    width: 100%;
    height: 262px;
    border-top: solid 2px bisque;
}
.hot-job .sub-div{
    display: block;
    border-right: solid 2px #f6f6f8;
    border-bottom: solid 2px #f6f6f8;
    height: 131px;
    width: 33.1333333%;
    float: left;
}
.sub-div .job-info{
    height: 71px;
    padding-top: 10px;
    display: block;
    color: #414a60;
}
.hot-job .sub-div p{
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    color: #61687c;
    width: 220px;
    padding-right: 70px;
    margin: 0 auto 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
}
.sub-div .job-info .salary{
    color: #fc6c38;
    position: absolute;
    right: 0;
    top: 0;
}
.job-info .job-text{
    font-size: 12px;
    color: #61687c;
    border-bottom: dashed 1px #e3e7ed;
    width: 290px;
    padding-right: 0;
    line-height: 28px;
}
.vline{
    display: inline-block;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
}
.user-info {
    padding: 9px 0 9px 0;
}
.user-info p{
    font-size: 14px;
    width: 290px;
    padding-right: 0;
    margin-top: 7px;
}
.user-info img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    border-radius: 50%;
    margin-right: 15px;
}
.user-info .user-text{
    margin-left: 10px;
    font-size: 12px;
    color: #8d92a1;
}

//热门公司
.hot-company{
    margin-top: 40px;
    display: block;
    font-weight: 400;
    background: #fff;
    width: 100%;
    height: 416px;
    border-top: solid 2px bisque;
}
.hot-company .company-div{
    display: block;
    border-left: solid 2px #f6f6f8;
    border-bottom: solid 2px #f6f6f8;
    height: 33.3333%;
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
.more-tab{
  text-align: center;
  margin-top: 458px;
}


</style>
