<template>
   <div>
       <div class="login-box" id="app" >
            <el-row>
                <el-col :span="8">
                    <el-input id="name"  v-model="name" placeholder="请输入帐号">
                        <template slot="prepend">帐号</template>
                    </el-input> 
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
                        <template slot="prepend">密码</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-button id="login" v-on:click="check" style="width:100%" type="primary">登录</el-button>
                </el-col>
            </el-row>
        </div>

   </div>
</template>

<script>
export default {
    data(){
		return{
            name : '',
            password : '',
        }	
    },
    methods : {
			check : function(){
				//获取值
				var name = this.name;
				var password = this.password;
				if(name == '' || password == ''){
					this.$message({
						message : '账号或密码为空！',
						type : 'error'
					})
					return;
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
	.login-box {
		margin-top:20%;
		margin-left:40%;
	}
</style>