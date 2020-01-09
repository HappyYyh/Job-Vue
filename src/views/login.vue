<template>
    <el-row>
        <el-col :span="8" :offset="8">
            <el-col :span="20" :offset="2">
                <div class="grid-content bg-purple" v-loading="loading">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-row>
                                <el-col :span="6" :offset="4">
                                    <el-button v-model="loginType" @click="type0" v-bind:class="{choose:isActive0}">
                                        密码登陆
                                    </el-button>
                                </el-col>
                                <el-col :span="6" :offset="4">
                                    <el-button v-model="loginType" @click="type1" v-bind:class="{choose:isActive1}">
                                        短信登陆
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <div style="margin-top:30px" v-show="showPhoneAndEmail">
                                <el-row>
                                    <el-col :span="20" :offset="2">
                                        <el-input placeholder="请输入手机号/邮箱" v-model="phoneAndEmail" class="regist-length"
                                                  prefix-icon="el-icon-mobile-phone"></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="margin-top:30px" v-show="showPhone">
                                <el-row>
                                    <el-col :span="20" :offset="2">
                                        <el-input placeholder="请输入手机号" v-model="phone"
                                                  prefix-icon="el-icon-mobile-phone" class="regist-length"></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="margin-top:30px" v-show="showCheckCode">
                                <el-row>
                                    <el-col :span="20" :offset="2">
                                        <el-input placeholder="请输入验证码" v-model="checkCode" prefix-icon="el-icon-check">
                                            <template slot="append">
                                                <el-button v-show="showSend" style="width:142px"
                                                           @click="sendRegistCode()">获取验证码
                                                </el-button>
                                                <span v-show="time>0">{{time}}秒后重新获取</span>
                                            </template>
                                        </el-input>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="margin-top:30px" v-show="showPassword">
                                <el-row>
                                    <el-col :span="20" :offset="2">
                                        <el-input placeholder="请输入密码" v-model="password" show-password
                                                  class="regist-length"></el-input>
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
                            <div style="margin-top:30px">
                                <el-row>
                                    <el-col :span="20" :offset="2">
                                        <el-button style="width:100%" @click="login" type="success">登陆</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="text-tip">
                                <el-row>
                                    <el-col :span="20" :offset="2">
                                        <div class="left-tip">
                                            <a href="">忘记密码?</a>
                                        </div>
                                        <div class="right-tip">
                                    <span class="tip1">
                                    没有账号
                                    </span>
                                            <router-link to="regist">
                                                <span class="tip2">立即注册</span>
                                            </router-link>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-col>
    </el-row>

</template>

<script>
    import api from '../axios/api';

    export default {
        data() {
            return {
                isActive0: true,
                isActive1: false,
                showPhoneAndEmail: true,
                showPhone: false,
                showCheckCode: false,
                showPassword: true,
                loginType: 0,
                phoneAndEmail: "",
                phone: "",
                checkCode: "",
                password: "",
                value1: 0,
                time: 0,
                showSend: true,
                loading: false,
                userInfo: '',
            }
        },
        methods: {
            formatTooltip(val) {
                return val / 100;
            },
            type0: function () {
                if (this.loginType !== 0) {
                    //如果不为0
                    this.isActive0 = true;
                    this.isActive1 = false;
                    this.showPhoneAndEmail = true;
                    this.showPhone = false;
                    this.showCheckCode = false;
                    this.showPassword = true;
                    this.loginType = 0;
                    this.phone = "";
                    this.checkCode = "";
                }
            },
            type1: function () {
                if (this.loginType !== 1) {
                    this.isActive0 = false;
                    this.isActive1 = true;
                    this.showPhoneAndEmail = false;
                    this.showPhone = true;
                    this.showCheckCode = true;
                    this.showPassword = false;
                    this.loginType = 1;
                    this.phoneAndEmail = "";
                    this.password = "";
                }
            },
            //注册验证码
            sendRegistCode: function () {
                var phone = this.phone;
                var phoneReg = /^1[3578][01379]\d{8}|1[34578][01256]\d{8}|(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;

                if (phone === '' || !phoneReg.test(phone)) {
                    this.$message({
                        showClose: true,
                        message: "请输入正确的手机号!",
                        type: 'warning'
                    });
                } else {
                    api.sendCheckCode({
                        type: 1,
                        phone: phone
                    }).then(res => {
                        if (res.success === true) {
                            this.$notify({
                                title: '成功',
                                message: '验证码发送成功!',
                                type: 'success'
                            });
                            this.time = 60;
                            this.showSend = false;
                            var timer = setInterval(() => {
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
            /**
             * 登陆
             */
            login: function () {
                var phone = this.phone;
                var phoneAndEmail = this.phoneAndEmail;
                var checkCode = this.checkCode;
                var password = this.password;
                var loginType = this.loginType;
                var message = "";
                var isAlert = false;
                var userInfo = "";
                const loginRequest = {
                    phoneAndEmail: phoneAndEmail,
                    phone: phone,
                    password: password,
                    checkCode: checkCode,
                    loginType: loginType,
                }
                var mailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                var phoneReg = /^1[3578][01379]\d{8}|1[34578][01256]\d{8}|(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
                var checkCodeReg = /^\d{6}$/;
                var passwordReg = /^[a-zA-Z0-9_@!?]{6,18}$/
                if (this.value1 != 100) {
                    message = "请拖动滑块到最右侧!"
                    isAlert = true;
                }
                if (loginType === 0) {
                    //密码登陆
                    if (password === '' || !passwordReg.test(password)) {
                        message = "请输入正确的密码!"
                        isAlert = true;
                    }
                    if (phoneAndEmail === '' || phoneAndEmail.length != 11 || (!phoneReg.test(phoneAndEmail) && !mailReg.test(phoneAndEmail))) {
                        message = "请输入正确手机或者邮箱!"
                        isAlert = true;
                    }
                } else {
                    if (checkCode === '' || !checkCodeReg.test(checkCode)) {
                        message = "请输入正确的验证码!"
                        isAlert = true;
                    }
                    if (phone === '' || !phoneReg.test(phone)) {
                        message = "请输入正确的手机号!"
                        isAlert = true;
                    }
                }
                if (isAlert) {
                    this.$message({
                        showClose: true,
                        message: message,
                        type: 'warning'
                    });
                } else {
                    api.login(loginRequest).then(res => {
                        if (res.code === '506') {
                            this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'error'
                            });
                            this.$router.push("/regist");
                        }
                        if (res.success === true) {
                            this.userInfo = res.data
                            userInfo = this.userInfo
                            //登陆信息存储到本地
                            var curTime = new Date().getTime();
                            localStorage.setItem("userInfo", JSON.stringify({
                                user: JSON.stringify(userInfo),
                                time: curTime
                            }));
                            this.$store.state.currentUser = userInfo;
                            this.$notify({
                                title: '成功',
                                message: '登陆成功',
                                type: 'success'
                            });
                            if (userInfo.role === 1) {
                                //如果是招聘者
                                if (userInfo.firstLogin === true) {
                                    //如果首次登陆
                                    this.$router.push("/recruiter/firstLogin");
                                } else {
                                    //返回登陆上一页
                                    if (this.$route.query.redirect) {
                                        this.$router.push({path: decodeURIComponent(this.$route.query.redirect)});
                                    } else {
                                        this.$router.push("/");
                                    }
                                }
                            } else {
                                //如果是求职者
                                if (userInfo.firstLogin === true) {
                                    //如果首次登陆
                                    this.$router.push("/resume/resumeInfo");
                                } else {
                                    //返回登陆上一页
                                    if (this.$route.query.redirect) {
                                        this.$router.push({path: decodeURIComponent(this.$route.query.redirect)});
                                    } else {
                                        this.$router.push("/");
                                    }
                                }
                            }
                        }
                    })
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
        margin-top: 20%;
        width: 100%;
    }

    .choose {
        background-color: bisque
    }

    .text-tip {
        padding: 24px 0 0 0;
        font-size: 14px;
    }

    .left-tip {
        float: left;
    }

    .right-tip {
        float: right;
    }

    .right-tip .tip1 {
        color: #9fa3b0;
    }
</style>