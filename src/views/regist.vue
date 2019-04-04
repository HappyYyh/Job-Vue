<template>
<el-row>
	<el-col :span="8" :offset="8">
		<div class="grid-content bg-purple">
					<el-card class="box-card">
							<div slot="header" class="clearfix">
								<el-row>
									<el-col :span="6" :offset="4">
										<el-button v-model="role" @click="role0" v-bind:class="{choose:isActive0}">我是求职者</el-button>
									</el-col>
									<el-col :span="6" :offset="4">
										<el-button v-model="role" @click="role1" v-bind:class="{choose:isActive1}">我是招聘者</el-button>
									</el-col>
								</el-row>
							</div>
						<div>
							<div>
								<el-row>
									<el-col :span="20" :offset="2">
										<el-input placeholder="请输入手机号" v-model="phone" class="regist-length"  prefix-icon="el-icon-mobile-phone"></el-input>
									</el-col>
								</el-row>
							</div>
							<div style="margin-top:30px">
								<el-row>
									<el-col :span="20" :offset="2">
										<el-input placeholder="请输入邮箱" v-model="email" prefix-icon="el-icon-message"  class="regist-length"></el-input>
									</el-col>
								</el-row>
							</div>
							<div style="margin-top:30px">
								<el-row>
									<el-col :span="20" :offset="2">
										<el-input placeholder="请输入验证码" v-model="checkCode" prefix-icon="el-icon-check">
											<template slot="append">
												<el-button>获取验证码</el-button>
											</template>
										</el-input>
									</el-col>
								</el-row>	
							</div>
							<div style="margin-top:30px">
								<el-row>
									<el-col :span="20" :offset="2">
										<el-input placeholder="请输入6-8位数字和字母的密码" v-model="password" show-password class="regist-length"></el-input>
									</el-col>
								</el-row>
							</div>
							<div class="block" style="margin-top:30px">
								<el-row>
									<el-col :span="19" :offset="2">
										<el-slider v-model="value1"></el-slider>
									</el-col>
								</el-row>
							</div>
							<div  style="margin-top:30px">
								<el-row>
									<el-col :span="20" :offset="2">
										<el-button style="width:100%" @click="regist" type="success">注册</el-button>
									</el-col>
								</el-row>
							</div>
						</div>
			</el-card>
		</div>
		</el-col>
</el-row>

</template>

<script>
export default {
	data() {
      return {
				isActive0:false,
				isActive1:false,
				role:0,
				phone:"",
				email:"",
				checkCode:"",
				password:"",
				value1: 0,
			}
	},
	methods:{
			formatTooltip(val) {
				return val / 100;
			},
			role0:function(){
				this.role = 0;
				this.isActive0 = true;
				this.isActive1 = false;
			},
			role1:function(){
				this.role = 1;
				this.isActive0 = false;
				this.isActive1 = true;
			},
			regist:function(){
				var phone = this.phone;
				var email = this.email;
				var checkCode = this.checkCode;
				var password = this.password;
				var message = "";
				var isAlert = false;
				var mailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				var phoneReg = /^1[3578][01379]\d{8}|1[34578][01256]\d{8}|(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
				var checkCodeReg = /^\d{6}$/ ;
				var passwordReg=/^[a-zA-Z0-9_@!?]{6,18}$/
				if(this.value1 != 100){
					message = "请拖动滑块到最右侧!"
					isAlert = true;
				}
				if(password ==='' || !passwordReg.test(password)){
					message = "请输入正确的密码!"
					isAlert = true;
				}
				if(checkCode ==='' || !checkCodeReg.test(checkCode)){
					message = "请输入正确的验证码!"
					isAlert = true;
				}
				if(email ==='' || !mailReg.test(email)){
					message = "请输入正确的邮箱!"
					isAlert = true;
				}
				if(phone ==='' || !phoneReg.test(phone)){
					message = "请输入正确的手机号!"
					isAlert = true;
				}
				if(isAlert){
					this.$message({
							showClose: true,
							message: message,
							type: 'warning'
					});
				}else{
					console.log("role:"+this.role);
					console.log("phone:"+this.phone);
					console.log("email:"+this.email);
					console.log("checkCode:"+this.checkCode);
					console.log("password:"+this.password);
				}
			}
					
			
  }	
}
</script>


<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col {
	border-radius: 4px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}

.box-card {
	margin-top:20%;
	width: 100%;
}
.choose{
	background-color: bisque
}
</style>