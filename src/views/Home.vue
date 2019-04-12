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
    <el-menu-item index="1">
        <router-link to="/">
            <a href="#"><img class="logo" src="@/assets/logo.png"/></a>
        </router-link>
    </el-menu-item>
    <el-menu-item index="2" class="top-bar">
        <router-link to="/">
            <a href="#">首页</a>
        </router-link>
    </el-menu-item>
    <el-menu-item index="3">职位</el-menu-item>
    <el-menu-item index="4"><a  target="_blank">公司</a></el-menu-item>
    <!-- 未登陆 -->
    <el-menu-item index="5" v-show="!isLogin" class="not-login login-btn">
        <router-link to="/login">
            <el-button size="small"  type="primary" round>登陆</el-button> 
        </router-link>
    </el-menu-item>
    <el-menu-item index="6" v-show="!isLogin" class="not-login">
        <router-link to="/regist">
                <el-button size="small"  type="primary" round>注册</el-button>
        </router-link>
    </el-menu-item>
    <!-- 求职者 -->
    <el-menu-item index="5" v-show="role===0" class="seeker seeker-first">消息</el-menu-item>
    <el-menu-item index="6" v-show="role===0" class="seeker">简历</el-menu-item>
    <el-submenu index="7" v-show="role===0" class="seeker">
        <template slot="title">{{userName}}<img :src="userImg" alt="" class="headImg"></template>
        <el-menu-item index="7-1" v-show="role===0">选项1</el-menu-item>
        <el-menu-item index="7-2" v-show="role===0">选项2</el-menu-item>
        <el-menu-item index="7-3" v-show="role===0">选项3</el-menu-item>
    </el-submenu>
    <!-- 招聘者 -->
    <el-menu-item index="5" v-show="role===1" class="recruiter recruiter-first">消息</el-menu-item>
    <el-menu-item index="6" v-show="role===1" class="recruiter">简历查看</el-menu-item>
    <el-menu-item index="7" v-show="role===1" class="recruiter">新增职位</el-menu-item>
    <el-submenu index="8" v-show="role===1" class="recruiter">
        <template slot="title">{{userName}}&nbsp;&nbsp;&nbsp;<img :src="userImg" alt="" class="headImg"></template>
        <el-menu-item index="8-1" v-show="role===1" @click="dialogMyInfoVisible = true">个人中心</el-menu-item>
        <el-menu-item index="8-2" v-show="role===1" @click="companyInfo">公司信息</el-menu-item>
        <el-menu-item index="8-3" v-show="role===1" @click="logout">登出账号</el-menu-item>
    </el-submenu>
        <!-- 对话框 -->
        <el-dialog title="个人信息" :visible.sync="dialogMyInfoVisible" :width="dialogWidth">
            <el-form :model="form">
                <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMyInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogMyInfoVisible = false ;myInfo">确 定</el-button>
            </div>
        </el-dialog>
    </el-menu>
  </el-header>
  <div class="content">
      <router-view/>
  </div>
  
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
import api from '../axios/api';
  export default {
    data() {
      return {
        isHover:false,
        activeIndex: '1',
        activeIndex2: '2',
        select: '',
        isLogin:false,
        userName:'',
        userImg:'',
        role:'',
        token:'',
        dialogMyInfoVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogWidth:"500px",
        formLabelWidth: '120px'
      };
    },
    mounted(){
        let userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            var data  = JSON.parse(userInfo);
            if (new Date().getTime() - data.time > 15*24*60*60*1000) {
                console.log(userInfo+'已过期');
                localStorage.removeItem(userInfo);
            }else{
                var user = JSON.parse(data.user);
                //请求头中放入token
                this.isLogin = true;
                this.userName = user.nickName;
                this.userImg = user.headImg;
                this.role = user.role;
                this.token = user.token;
            }
        }    

    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        api.logout({token:this.token}).then(()=>{
            localStorage.removeItem("userInfo");
            window.location.href="/";
        })
      },
      companyInfo(){
          this.$router.push("/company/info");
      },
      myInfo(){
          console.log("信息提交")
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
.not-login{
    padding: 0 5px;
}
.login-btn{
    margin-left: 500px;
}
.seeker{
    padding: 0 10px;
}
.recruiter{
    padding: 0 10px;
}
.recruiter-first{
    margin-left: 400px;
}
.headImg{
    width: 26px;
    height: 26px;
    border-radius: 100%;
    vertical-align: middle;
    border: none;
}
.sub-menu{
    text-align: center;
}
.yes-login span{
    margin-left: 15px;
    margin-right: 15px;
}
.top-bar-btn a{
    margin: 0 0 5px 5px;
}

//内容
.content{
    min-height: calc(100vh - 120px);
}

//底部foot
.el-footer{
    background: #fff;
    padding: 20px 0 10px;
    position: relative;
    z-index: 22;
    color: #8d92a1;
    border-top: solid 1px #f6f6f8;
    height: 60px;
    margin-top: 30px;
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
