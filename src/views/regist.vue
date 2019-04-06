<template>
<el-row>
	<el-col :span="8" :offset="8">
		<div class="grid-content bg-purple" v-loading="loading">
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
												<el-button v-show="showSend" style="width:142px" @click="sendRegistCode()">获取验证码</el-button>
												<span v-show="time>0">{{time}}秒后重新获取</span>
											</template>
										</el-input>
									</el-col>
								</el-row>	
							</div>
							<div style="margin-top:30px">
								<el-row>
									<el-col :span="20" :offset="2">
										<el-input placeholder="请输入6-18位数字和字母的密码" v-model="password" show-password class="regist-length"></el-input>
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
							<div  style="margin-top:20px">
								<el-row>
									<el-col :span="19" :offset="2">
										<el-checkbox v-model="checked">我已同意用户协议及隐私政策</el-checkbox>
										<router-link to="login">
											<div class="right-tip">
												<span>直接登陆</span>
											</div>
										</router-link>
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
import api from '../axios/api';
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
				//value1: 0,
				checked: false,
				time : 0,
				showSend: true,
				loading :false,
			}
	},
	mounted(){
	},
	methods:{
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
			//注册验证码
			sendRegistCode:function(){
					var phone = this.phone;
					var phoneReg = /^1[3578][01379]\d{8}|1[34578][01256]\d{8}|(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
					
					if(phone ==='' || !phoneReg.test(phone)){
						this.$message({
							showClose: true,
							message: "请输入正确的手机号!",
							type: 'warning'
					});
					}else{
						api.sendCheckCode({
							type:0,
							phone:phone
						}).then(res=>{
									if(res.success === true){
											this.$notify({
													title: '成功',
													message: '验证码发送成功!',
													type: 'success'
											});
											this.time = 60;
											this.showSend = false;
											var timer = setInterval(()=> {
													this.time--
													if (this.time === 0) {
															this.showSend = true;
															clearInterval(timer)
													}
											}, 1000)
									}
								})
						}
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
				if(this.checked != true){
					message = "请勾选用户协议!"
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
					this.loading = true;
					api.regist({
						phone:phone,
						email:email,
						checkCode:checkCode,
						password:password,
						role:this.role,
					}).then(res=>{
						if(res.success === true){
								this.$notify({
										title: '成功',
										message: '注册成功!',
										type: 'success'
								});
								this.$router.push("/login");
						}
						if (res.success === false && res.code === '505'){
								this.$router.push("/login");
						}
						this.loading = false;
					})
					this.loading = false;
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
.right-tip{
	float: right;
}
.right-tip span{
	font-size: 14px;
  color: #18c3b1;
}
</style>