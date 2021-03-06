import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser:'',
    recruiterInfo:'',
    industryCategory:
    [ {
        value:0,
        name:"民营企业"
      },
      {
        value:1,
        name:"电子商务"
      },
      {
        value:2,
        name:"游戏"
      },
      {
        value:3,
        name:"媒体"
      },
      {
        value:4,
        name:"广告营销"
      },
      {
        value:5,
        name:"数据服务"
      },
      {
        value:6,
        name:"医疗健康"
      },
      {
        value:7,
        name:"生活服务"
      },
      {
        value:8,
        name:"O2O"
      },
      {
        value:9,
        name:"旅游"
      },
      {
        value:10,
        name:"分类信息"
      },
      {
        value:11,
        name:"音乐/视频/阅读"
      },
      {
        value:12,
        name:"在线教育"
      },
      {
        value:13,
        name:"社交网络"
      },
      {
        value:14,
        name:"人力资源服务"
      },
      {
        value:15,
        name:"企业服务"
      },
      {
        value:16,
        name:"信息安全"
      },
      {
        value:17,
        name:"智能硬件"
      },
      {
        value:18,
        name:"移动互联网"
      },
      {
        value:19,
        name:"互联网"
      },
      {
        value:20,
        name:"计算机软件"
      },
      {
        value:21,
        name:"通信/网络设备"
      },
      {
        value:22,
        name:"广告/公关/会展"
      },
      {
        value:23,
        name:"互联网金融"
      },
      {
        value:24,
        name:"物流/仓储"
      },
      {
        value:25,
        name:"贸易/进出口"
      },
      {
        value:26,
        name:"咨询"
      },
      {
        value:27,
        name:"工程施工"
      },
      {
        value:28,
        name:"汽车生产"
      },
      {
        value:29,
        name:"其他行业"
      }
    ],
    financingStatus:[
    {
      value:0,
      name:"未融资"
    },
    {
      value:1,
      name:"天使轮"
    },
    {
      value:2,
      name:"A轮"
    },
    {
      value:3,
      name:"B轮"
    },
    {
      value:4,
      name:"C轮"
    },
    {
      value:5,
      name:"D轮及以上"
    },
    {
      value:6,
      name:"上市公司"
    },
    {
      value:7,
      name:"不需要融资"
    }],
    staffNum:[
    {
      value:0,
      name:"少于15人"
    },
    {
      value:1,
      name:"15-50人"
    },
    {
      value:2,
      name:"50-150人"
    },
    {
      value:3,
      name:"150-500人"
    },
    {
      value:4,
      name:"500-2000人"
    },
    {
      value:5,
      name:"2000人以上"
    },
  ],
    workEducation:[
      {
      value:0,
      label:'大专'
      },
      {
      value:1,
      label:'本科'
      },
      {
      value:2,
      label:'硕士'
      },
      {
      value:3,
      label:'博士'
       },
       {
      value:4,
      label:'不限'
      },
    ],
    workExperience:[
      {
      value:0,
      label:'经验不限'
      },
      {
      value:1,
      label:'应届毕业生'
      },
      {
      value:2,
      label:'1年以内'
      },
      {
      value:3,
      label:'1~3年'
       },
       {
      value:4,
      label:'3～5年'
      },
      {
      value:5,
      label:'5～10年'
        },
        {
      value:6,
      label:'10年以上'
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
