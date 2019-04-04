<template>
<el-container>
  <el-header>
    <!-- 顶部导航栏 -->
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1"><a href="#"><img class="logo" src="@/assets/logo.png"/></a></el-menu-item>
    <el-menu-item index="2" class="top-bar">首页</el-menu-item>
    <!-- <el-submenu index="2"> -->
        <!-- <template slot="title">首页</template> -->
        <!-- <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
    </el-submenu> -->
    <el-menu-item index="3">职位</el-menu-item>
    <el-menu-item index="4"><a  target="_blank">公司</a></el-menu-item>
    <el-menu-item index="5" class="top-bar-btn">
        <router-link to="login">
            <el-button size="small"  type="primary" round>登陆</el-button> 
        </router-link>
        <router-link to="regist">
             <el-button size="small"  type="primary" round>注册</el-button>
        </router-link>
    </el-menu-item>
    </el-menu>
  </el-header>
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
              <img src="http://image.yangyhao.top/images/png/15536777233442610.png">
          </div>
          <!-- 右侧隐藏区域 -->
          <div class="rightWrap" @mouseover="handelOver(index)" @mouseout="handelOut"  v-for="(jobSecond, index) in secondList" :key="index" v-show="index<12 && index === showRight">
            <div class="secondList">
              <div class="jobSecond" v-for="(item,ind) in jobSecond" :key="ind">
                <div class="secondArea">
                  <span>{{item.secondName}}</span>
                </div>
                <div class="thirdArea">
                  <span class="thirdName" v-for="jobThird in item.thirdResponseList" :key="jobThird.index">{{jobThird.thirdName}}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    <!-- 职位栏 -->
        <div class="hot-job">
           <div class="sub-div" v-for="(item,index) in hotJob" :key="index">
               <a href="#" class="job-info">
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
               <a href="#" class="user-info">
                    <p style="margin-top:7px">
                        <img src="https://img2.bosszhipin.com/boss/avatar/avatar_5.png?x-oss-process=image/resize,w_100,limit_0" alt="">
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
                <a href="#" class="company-info">
                    <img src="https://img.bosszhipin.com/beijin/mcs/chatphoto/20160720/ed49d80596791760285e5d6e7d7785b0687d53309a83a89b4e1257a27ee9c74d.jpg?x-oss-process=image/resize,w_100,limit_0" >
                    <div class="company-text">
                        <h4>金证股份</h4>
                        <p>
                            已上市
                        <span class="vline"></span>
                            计算机软件
                        </p>
                    </div>
                </a>
                <a href="" class="about-info">
                    
                </a>
            </div>
        </div>
    </div>
  </el-main>
  <el-footer>
      <div class="about"></div>
      <div class="copyright">
          <p>
              <span>Copyright © 2019 "快来吧"职业共享网站</span>
          </p>
      </div>
  </el-footer>
</el-container>

</template>
<script>
  export default {
    data() {
      return {
        isHover:false,
        activeIndex: '1',
        activeIndex2: '2',
        input5: '',
        select: '',
        firstJobId: '',
        jobCategory:[],
        secondList: [],
        showRight: '',
        hotJob:[1,2,3,4,5,6],
        hotCompany:[1,2,3,4,5,6,7,8,9,10,11,12],
      };
    },
    mounted(){
      this.$axios.get('http://industry.yangyhao.top/getAllCategory')
      .then(res =>{
          console.log(res.data);
          this.jobCategory= res.data;
          this.secondList = res.data.map((item)=>item.secondResponseList);
          console.log('secondList',this.secondList)
      })
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
      }
    }
  }
</script>
<style lang="scss" scoped>
//头部
.el-header{
    padding: 0;
}
// 导航栏
.el-menu-demo{
    padding: 0 80px
}
.logo{
    height: 50px;
    margin-left: 150px;
    margin-right: 50px
}
.top-bar-btn{
    float :right;
}

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

//底部foot
.el-footer{
    background: #fff;
    padding: 20px 0 10px;
    margin-top: 43px;
    position: relative;
    z-index: 22;
    color: #8d92a1;
    border-top: solid 1px #f6f6f8;
}
.copyright {
    color: #eeeff3;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
}
.copyright span {
    color: #8d92a1;
    display: inline-block;
    margin-right: 15px;
}
</style>
