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
  export default {
    data() {
      return {
        isHover:false,
        activeIndex: '1',
        activeIndex2: '2',
        input5: '',
        select: '',
      };
    },
    mounted(){
      
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
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
    margin-right: 120px; 
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
