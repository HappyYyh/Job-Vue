<template>
	<el-container>
		<el-main style="overflow-y: hidden;">
			<div class="main">
				<!-- 搜索框 -->
				<div style="margin-top: 50px;" class="search-input">
					<el-cascader
						:options="options"
						style="width:15%"
						:show-all-levels="false"
						slot="prepend"
						:props="props"
						v-model="selectedOptions"
						@change="handleCategoryChange"
						placeholder="请选择职位分类"
					></el-cascader>
					<el-input placeholder="请输入职位搜索" style="width:78%" v-model="jobName" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="toJobByInput"></el-button>
					</el-input>
				</div>
				<!-- 左侧职业选择框 -->
				<div class="job-menu">
					<div class="left">
						<div v-for="(jobFirst, index) in jobCategory" :key="index" @mouseover.prevent="handelOver(index)" @mouseout="handelOut" v-show="index < 12">
							<div class="active">
								<a href="#" class="firstCategory">{{ jobFirst.firstName }}</a>
								<span>
									<span v-for="(item, ind) in leftHotJob" :key="ind">
										<span v-if="index === item.id">
											<a @click="toJobByJobName(name)" v-for="(name, i) in item.item" :key="i" class="hotCategory" href="javascript:void(0)">{{ name }}</a>
										</span>
									</span>
								</span>
								<i class="el-icon-arrow-right"></i>
							</div>
						</div>
						<!-- <div v-for="(jobFirst,index) in jobCategory" :key="jobFirst.firstId" @mouseover.prevent="handelOver(index)" @mouseout="handelOut" v-show="index>=12 && showMoreFirst">
              <div class="active">
                <a href="#" class="firstCategory">{{jobFirst.firstName}}</a>
                <span>
                  <span v-for="(item,ind) in leftHotJob" :key="ind" >
                    <span v-if="index===item.id">
                      <a @click="toJobByJobName(name)" v-for="(name,i) in item.item" :key="i"  class="hotCategory" href="javascript:void(0)" >
                        {{name}}
                      </a>
                    </span>
                  </span>
                </span>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div> -->
						<div class="showMore"><a href="javascript:void(0)" @click="showMoreFirst = true">查看更多职位</a></div>
					</div>
					<!-- 右侧图片 -->
					<div class="rightImg">
						<table>
							<tbody>
								<tr>
									<td colspan="2" rowspan="1"><img src="http://image.yangyhao.top/image/jpeg/job-index/1.jpg" /></td>
									<td colspan="1" rowspan="2"><img src="http://image.yangyhao.top/image/jpeg/job-index/3.jpg" /></td>
								</tr>
								<tr>
									<td colspan="2" rowspan="1"><img src="http://image.yangyhao.top/image/jpeg/job-index/2.jpeg" /></td>
								</tr>
								<tr>
									<td><img src="http://image.yangyhao.top/image/jpeg/job-index/8.jpg" /></td>
									<td><img src="http://image.yangyhao.top/image/jpeg/job-index/9.jpg" /></td>
									<td><img src="http://image.yangyhao.top/image/jpeg/job-index/10.jpg" /></td>
								</tr>
								<!-- <tr>
                  <td colspan="2" rowspan="1"><img src="http://image.yangyhao.top/image/jpeg/job-index/4.jpeg"></td>
                  <td><img src="http://image.yangyhao.top/image/jpeg/job-index/5.jpg"></td>
                </tr> -->
								<tr>
									<td colspan="2" rowspan="1"><img src="http://image.yangyhao.top/image/jpeg/job-index/6.jpg" /></td>
									<td><img src="http://image.yangyhao.top/image/jpeg/job-index/7.jpg" /></td>
								</tr>
							</tbody>
						</table>
						<!-- <img src="http://image.yangyhao.top/images/jpg/3.jpg"> -->
					</div>
					<!-- 右侧隐藏区域 -->
					<div
						class="rightWrap"
						@mouseover="handelOver(index)"
						@mouseout="handelOut"
						v-for="(jobSecond, index) in secondList"
						:key="index"
						v-show="index < 12 && index === showRight"
					>
						<div class="secondList">
							<div class="jobSecond" v-for="(item, ind) in jobSecond" :key="ind">
								<div class="secondArea">
									<span>{{ item.secondName }}</span>
								</div>
								<div class="thirdArea">
									<a
										href="javascript:void(0)"
										@click="toJobByThirdName(jobThird.thirdName)"
										v-for="jobThird in item.jobThirdCategoryResponseList"
										:key="jobThird.index"
									>
										<span class="thirdName">{{ jobThird.thirdName }}</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 职位栏 -->
				<div class="title-div"><span class="title">热门职位</span></div>
				<div class="hot-job">
					<div class="sub-div" v-for="(item, index) in hotJob" :key="index">
						<a href="javascript:void(0);" class="job-info" @click="toJobDetailById(item.id)">
							<p>
								{{ item.jobName }}
								<span class="salary">{{ item.salaryStart }}-{{ item.salaryEnd }}k</span>
							</p>
							<p class="job-text" style="font-size:13px">
								{{ item.city }}
								<span class="vline"></span>
								{{
									item.workExperience === 0
										? '经验不限'
										: item.workExperience === 1
										? '应届生'
										: item.workExperience === 2
										? '1年以内'
										: item.workExperience === 3
										? '1~3年'
										: item.workExperience === 4
										? '3～5年'
										: item.workExperience === 5
										? '5～10年'
										: '10年以上'
								}}
								<span class="vline"></span>
								{{
									item.workEducation === 0
										? '大专'
										: item.workEducation === 1
										? '本科'
										: item.workEducation === 2
										? '硕士'
										: item.workEducation === 3
										? '博士'
										: '不限'
								}}
							</p>
						</a>
						<a href="javascript:void(0);" class="user-info">
							<p style="margin-top:7px">
								<img :src="item.headImg" />
								<span class="user-text">
									{{ item.nickName === '' ? '暂无' : item.nickName }}
									<span class="vline"></span>
									{{ item.position }}
								</span>
							</p>
						</a>
					</div>
					<div class="noContent" v-if="hotJob.length === 0">暂无热门职位</div>
					<div class="more-tab" v-if="hotJob.length > 0"><el-button style="width:300px" href="javascript:void(0);" @click="toJobByNullArgs">查看更多</el-button></div>
				</div>
				<!-- 公司栏 -->
				<div class="title-div" style="margin-top: 100px;"><span class="title">热门企业</span></div>
				<div class="hot-company">
					<div class="company-div" v-for="(item, index) in hotCompany" :key="index">
						<a href="javascript:void(0);" class="company-info" @click="toCompanyDetailById(item.id)">
							<img :src="item.img" />
							<div class="company-text">
								<h4>{{ item.name }}</h4>
								<p>
									<span v-if="item.financingStatus === 0">未融资</span>
									<span v-if="item.financingStatus === 1">天使轮</span>
									<span v-if="item.financingStatus === 2">A轮</span>
									<span v-if="item.financingStatus === 3">B轮</span>
									<span v-if="item.financingStatus === 4">C轮</span>
									<span v-if="item.financingStatus === 5">D轮及以上</span>
									<span v-if="item.financingStatus === 6">上市公司</span>
									<span v-if="item.financingStatus === 7">不需要融资</span>
									<span class="vline"></span>
									<span>
										<span v-for="(option, ind) in industryCategory" :key="ind" v-show="option.value === item.industryCategory">{{ option.name }}</span>
									</span>
								</p>
							</div>
						</a>
						<a href="javascript:void(0);" class="about-info">
							<p>
								<span style="float:left">
									<span style="color: #00c2b3;">{{ item.jobNum }}</span>
									个在招职位
								</span>
								<span style="float:right">
									<span style="color: #00c2b3;">{{ item.recruiterNum }}</span>
									位招聘者
								</span>
							</p>
						</a>
					</div>
					<div class="noContent" v-if="hotCompany.length === 0">暂无热门企业</div>
					<div class="more-tab" v-if="hotCompany.length > 0">
						<el-button style="width:300px" href="javascript:void(0);" @click="toCompanyByNullArgs">查看更多</el-button>
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
			jobName: '',
			category: '',
			showMoreFirst: false,
			jobCategory: [],
			leftHotJob: [
				{ id: 0, item: ['CEO/总裁/总经理'] },
				{ id: 1, item: ['Java', 'PHP', 'Web前端'] },
				{ id: 2, item: ['产品经理', '产品总监'] },
				{ id: 3, item: ['UI设计师', '平面设计师'] },
				{ id: 4, item: ['新媒体运营', '产品运营'] },
				{ id: 5, item: ['市场营销', '市场推广'] },
				{ id: 6, item: ['人事/hr', '行政'] },
				{ id: 7, item: ['销售专员', '销售经理'] },
				{ id: 8, item: ['文案', '广告创意', '编辑'] },
				{ id: 9, item: ['投资经理', '投资总监'] },
				{ id: 10, item: ['汽车销售', '汽车维修'] },
				{ id: 11, item: ['课程设计', '教务管理'] }
			],
			secondList: [],
			options: [],
			props: {
				label: 'value',
				value: 'value',
				children: 'children'
			},
			selectedOptions: [],
			showRight: '',
			hotJob: [],
			hotCompany: [],
			industryCategory: [],
			financingStatus: []
		};
	},
	created() {
		//查询职位选项
		api.getAllCategory().then(res => {
			this.jobCategory = res.data;
			this.secondList = res.data.map(item => item.jobSecondCategoryResponseList);
			let categorys = res.data;
			let options = [];
			categorys.forEach((first, index) => {
				options.push({
					value: first.firstName,
					lable: first.firstId,
					children: []
				});
				first.jobSecondCategoryResponseList.forEach((second, ind) => {
					options[index].children.push({
						value: second.secondName,
						lable: second.secondId,
						children: []
					});
					second.jobThirdCategoryResponseList.forEach(third => {
						options[index].children[ind].children.push({
							value: third.thirdName
						});
					});
				});
			});
			this.options = options;
		});
		//数据回显
		this.industryCategory = this.$store.state.industryCategory;
		this.financingStatus = this.$store.state.financingStatus;
	},
	mounted() {
		//查询职位信息
		this.queryJob();
		//查询公司信息
		this.queryCompany();
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		handelOver(id) {
			this.showRight = id;
		},
		handelOut() {
			this.showRight = '';
		},
		handleCategoryChange(val) {
			this.category = val.join('/');
		},
		//查询首页公司信息
		queryCompany() {
			api.queryCompany({
				pageNo: 1,
				pageSize: 12
			}).then(res => {
				this.hotCompany = res.data.list;
			});
		},
		//查询首页职位信息
		queryJob() {
			api.queryJob({
				pageNo: 1,
				pageSize: 6
			}).then(res => {
				this.hotJob = res.data.list;
			});
		},
		//跳转到职位页面（根据参数）
		toJob(category, jobName) {
			this.$router.push({
				name: 'jobInfoList',
				params: {
					category,
					jobName
				}
			});
		},
		//输入框查询
		toJobByInput() {
			this.toJob(this.category, this.jobName);
		},
		//查看更多
		toJobByNullArgs() {
			this.$router.push('/job/list');
		},
		//跳转到职位查询页面（三级分类名称）
		toJobByThirdName(thirdName) {
			this.toJob(thirdName, '');
		},
		//跳转到职位查询页面（职位名称）
		toJobByJobName(jobName) {
			this.toJob('', jobName);
		},
		//跳转到职位详情页面
		toJobDetailById(jobId) {
			this.$router.push({
				name: 'jobDetail',
				params: {
					jobId
				}
			});
		},
		//跳转到公司查询页面(名称)
		toCompanyDetailById(companyId) {
			this.$router.push({
				name: 'companyDetail',
				params: {
					companyId
				}
			});
		},
		//查看更多
		toCompanyByNullArgs() {
			this.$router.push('/company/list');
		}
	}
};
</script>
<style lang="scss" scoped>
// main
.main {
	padding: 20px 12%;
}

.search-input {
	padding: 0 5%;
}

.el-select {
	width: 130px;
}

// 左侧职业选择栏
.job-menu {
	margin-top: 40px;
	position: relative;
	height: 600px;
}
.job-menu .left {
	float: left;
	width: 320px;
	background: #fff;
	box-shadow: 5px 5px 15px rgba(3, 0, 0, 0.04);
}
.job-menu .left div {
	line-height: 40px;
	padding: 0px;
	margin: 0px;
	height: 40px;
}

.job-menu .left .active:hover {
	//#5cc9b4
	background: bisque;
	.firstCategory,
	.hotCategory {
		color: #fff;
	}
}
.showMore {
	text-align: center;
	color: #999;
	border-top: solid 1px #f5f6f9;
}
.rightWrap {
	position: absolute;
	left: 320px;
	top: 0;
	width: 700px;
	box-sizing: border-box;
	z-index: 1;
	padding: 40px;
	min-height: 480px;
	background: #fff;
	box-shadow: 0 1px 6px rgba(6, 0, 1, 0.1);
}
.rightImg {
	position: absolute;
	left: 340px;
	top: 0;
}
table {
	border-collapse: collapse;
}
.rightImg tr {
	min-height: 114px;
	height: 114px;
	display: block;
}
.rightImg td {
	padding-right: 2px;
	padding-bottom: 2px;
	width: auto;
	vertical-align: top;
}
.rightImg img {
	width: 100%;
	height: 100%;
}
.secondArea {
	width: 25%;
	float: left;
	line-height: 30px;
	color: #999;
	font-size: 14px;
}
.thirdArea {
	width: 68%;
	float: left;
	line-height: 30px;
	border-bottom: solid 1px #f5f6f9;
	padding: 0 0 10px 1px;
	color: #61687c;
}
.thirdName {
	font-size: 14px;
	line-height: 30px;
	margin-right: 20px;
}
.firstCategory {
	color: #414a60;
	font-size: 16px;
	font-weight: bold;
	margin-left: 18px;
	margin-top: 5px;
}
.hotCategory {
	color: #666666;
	font-size: 14px;
	margin-left: 20px;
	color: #999;
}
.el-icon-arrow-right {
	float: right;
	color: #666;
	margin: 10px;
}

//热门职业
.title-div {
	padding-top: 15px;
	text-align: center;
	background: #fff;
	width: 100%;
	height: 40px;
}
.title-div .title {
	color: bisque;
}
.hot-job {
	display: block;
	background: #fff;
	width: 100%;
	height: 262px;
	border-top: solid 2px bisque;
	position: relative;
}
.hot-job .sub-div {
	display: block;
	border-right: solid 2px #f6f6f8;
	border-bottom: solid 2px #f6f6f8;
	height: 131px;
	width: 33.1333333%;
	float: left;
}
.sub-div .job-info {
	height: 71px;
	padding-top: 10px;
	display: block;
	color: #414a60;
}
.hot-job .sub-div p {
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
.sub-div .job-info .salary {
	color: #fc6c38;
	position: absolute;
	right: 0;
	top: 0;
}
.job-info .job-text {
	border-bottom: dashed 1px #e3e7ed;
	width: 290px;
	padding-right: 0;
	line-height: 28px;
}
.vline {
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
.user-info p {
	font-size: 14px;
	width: 290px;
	padding-right: 0;
	margin-top: 7px;
}
.user-info img {
	width: 30px;
	height: 30px;
	vertical-align: middle;
	border-radius: 50%;
	margin-right: 15px;
}
.user-info .user-text {
	margin-left: 10px;
	font-size: 12px;
	color: #8d92a1;
}

.noContent {
	font-size: 14px;
	text-align: center;
	height: 20px;
	margin: auto;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

//热门公司
.hot-company {
	// margin-top: 100px;
	display: block;
	font-weight: 400;
	background: #fff;
	width: 100%;
	height: 416px;
	border-top: solid 2px bisque;
	position: relative;
}
.hot-company .company-div {
	display: block;
	border-left: solid 2px #f6f6f8;
	border-bottom: solid 2px #f6f6f8;
	height: 33.3333%;
	margin-left: -2px;
	width: 24.9%;
	float: left;
}

.company-info {
	height: 75px;
	width: 205px;
	margin: 0 auto 0 auto;
	padding-top: 20px;
	border-bottom: dashed 1px #ededed;
	display: block;
}
.company-info img {
	height: 55px;
	width: 55px;
	float: left;
	border-radius: 10px;
	border: solid 1px #f2f5fa;
}
.company-text {
	margin-left: 65px;
	height: 65px;
	text-align: right;
	overflow: hidden;
	text-overflow: ellipsis;
}
.company-text h4 {
	margin: 0;
	height: 25px;
	line-height: 25px;
	font-size: 16px;
	font-weight: 400;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.company-text p {
	height: 40px;
	line-height: 41px;
	color: #898e9d;
	font-size: 12px;
	display: inline-block;
	white-space: nowrap;
}

.about-info {
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
.more-tab {
	text-align: center;
}
</style>
