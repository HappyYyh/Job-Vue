<template>
<el-container>
  <el-header>
    <!-- 顶部导航栏 -->
    <el-menu
    :default-active="activeIndex"
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
        <a href="javascript:void(0);" @click="toIndex">首页</a>
    </el-menu-item>
    <el-menu-item index="3">
        <a href="javascript:void(0);" @click="toJobInfo">职位</a>
    </el-menu-item>
    <el-menu-item index="4">
        <a href="javascript:void(0);" @click="toCompanyQuery">公司</a>
    </el-menu-item>
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
    <el-menu-item index="6" v-show="role===0" @click="toResume"  class="seeker">我的简历</el-menu-item>
    <el-menu-item index="7" v-show="role===0" class="seeker" @click="toSeekerJobSendList">我的投递</el-menu-item>
    <el-submenu index="8" v-show="role===0" class="seeker">
        <template slot="title">{{userName}}&nbsp;&nbsp;&nbsp;<img :src="userImg" alt="" class="headImg"></template>
        <el-menu-item index="8-1" v-show="role===0" @click="dialogMyInfoVisible = true">个人中心</el-menu-item>
        <el-menu-item index="8-2" v-show="role===0" @click="mySubScribe">我的订阅</el-menu-item>
        <el-menu-item index="8-3" v-show="role===0" @click="logout">退出登录</el-menu-item>
    </el-submenu>
    <!-- 招聘者 -->
    <el-menu-item index="5" v-show="role===1" class="recruiter recruiter-first">消息</el-menu-item>
    <el-menu-item index="6" v-show="role===1" class="recruiter" @click="toRecruiterGotList">简历查看</el-menu-item>
    <el-menu-item index="7" v-show="role===1" class="recruiter" @click="toJob">我的职位</el-menu-item>
    <el-submenu index="8" v-show="role===1" class="recruiter">
        <template slot="title">{{userName}}&nbsp;&nbsp;&nbsp;<img :src="userImg" alt="" class="headImg"></template>
        <el-menu-item index="8-1" v-show="role===1" @click="dialogMyInfoVisible = true">个人中心</el-menu-item>
        <el-menu-item index="8-2" v-show="role===1" @click="companyInfo">公司信息</el-menu-item>
        <el-menu-item index="8-3" v-show="role===1" @click="logout">登出账号</el-menu-item>
    </el-submenu>
        <!-- 对话框 -->
        <el-dialog title="个人信息" :visible.sync="dialogMyInfoVisible" :width="dialogWidth">
            <el-form :model="form">
                <el-form-item label="手机:" :label-width="formLabelWidth">
                    {{form.phone}}
                </el-form-item>
                <el-form-item label="邮箱:" :label-width="formLabelWidth">
                    {{form.email}}
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="个人头像" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8888/file/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="form.img" :src="form.img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </el-form-item>
                <el-form-item v-show="false"><el-input v-model="form.img" type="hidden"></el-input></el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMyInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="myInfo">确 定</el-button>
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
        activeIndex: '0',
        select: '',
        isLogin:false,
        userName:'',
        userImg:'',
        role:null,
        token:'',
        dialogMyInfoVisible: false,
        form: {
          nickName: '',
          img:'',
          phone:'',
          email:'',
          id:'',
        },
        fileList: [{name:'',url:''}],
        dialogWidth:"500px",
        formLabelWidth: '80px',
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
                //信息填充
                this.form.phone = user.phone;
                this.form.email = user.email;
                this.form.nickName = user.nickName;
                this.form.img = user.headImg;
                this.form.id = user.id;
                this.fileList[0].url = user.email.img;

                //连接webSocket
                this.initWebSocket();
            }
        }    
    },

    methods: {
        //跳转到首页
      toIndex(){
           this.$router.push("/")
        // window.location.href="/";
      },
      //跳转到职位查询页
      toJobInfo(){
            this.$router.push("/job/list")
      },
      //跳转到公司查询页
      toCompanyQuery(){
           this.$router.push("/company/list")
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      //登出
      logout(){
        api.logout({token:this.token}).then(()=>{
            localStorage.removeItem("userInfo");
            window.location.href="/";
        })
      },
      //跳转到求职者的投递列表页
      toSeekerJobSendList(){
          this.$router.push("/seeker/jobSend");
      },
      mySubScribe(){
          this.$router.push("/seeker/jobSubScribe");
      },
      //跳转到我的职位页
      toJob(){
          this.$router.push("/job/recruitersJob");
      },
      toRecruiterGotList(){
          this.$router.push('/recruiter/jobSend');
      },
      //跳转到招聘者公司详情页
      companyInfo(){
          this.$router.push("/company/info");
      },
      // eslint-disable-next-line no-unused-vars
      handleAvatarSuccess(res, file) {
        console.log(res);
          if(res.success){
              this.form.img = res.data
          }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //个人信息
      myInfo(){
          console.log("信息提交")
          api.userUpdate(this.form).then(res=>{
              if(res.success){
                this.dialogMyInfoVisible = false 
                this.$message({
                    showClose: true,
                    message: '个人信息已修改，重新登录后生效!',
                    type: 'info'
                })
                //todo 重新登陆 
                api.logout({token:this.token}).then(()=>{
                    localStorage.removeItem("userInfo");
                    this.$router.push("/login");
                })
              }
          })  
      },
      //求职者跳转到我的简历页
      toResume(){
          this.$router.push("/resume/resumeInfo");
      },

      //webSocket
      initWebSocket(){ 
          //初始化weosocket
        const wsuri = 'ws://localhost:8888/webSocket/'+this.form.id;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ 
        //连接建立之后执行send方法发送数据
        console.log("webSocket连接建立");
      },
      websocketonerror(){
          //连接建立失败重连
        this.initWebSocket()
      },
      websocketonmessage(e){
        let data = JSON.parse(e.data);
        let message;
        let title;
        if(this.role===0){
            message = data.companyName+"【"+data.position+"】于"+data.time+"发布了"+data.jobName+"【"+data.salaryStart+"K-"+data.salaryEnd+"K】职位!"
            title = "职位订阅通知";
        }else{
            message = data.userName+"【"+data.phone+"】于"+data.time+"投递了您的"+data.jobName+"【"+data.salaryStart+"K-"+data.salaryEnd+"K】职位!"
             title = "职位投递通知";
        }
        this.$notify.info({
            title,
            message,
            duration: 0
        })
        console.log(message)
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data)
      },
      websocketclose(e){  //关闭
        console.log('断开连接', e)
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
.seeker-first{
    margin-left: 400px;
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
</style>
