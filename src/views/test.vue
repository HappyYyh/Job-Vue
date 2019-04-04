<template>
   <div>
    <!-- <div v-for="(item,index) in data" :key="index" v-show="item.id===null?false:true">
        <span>{{item.name}}</span>
        <span>{{item.id}}</span>
    </div> -->

    <div v-for="(first,index) in jobCategory" :key="index">
        <div>
          <span v-on:hover="show">{{first.firstName}}</span>
        </div>
        <div v-for="second in first.secondResponseList" :key="second.index" v-show="isShow"  class="right">
          <p>{{second.secondName}}</p>
          <div v-for="third in second.thirdResponseList" :key="third.index">
             <span>{{third.thirdName}}</span>
          </div>
        </div> 
    </div>
  </div>  
    
</template>
<script>

//import { api } from "@/axios/axios.js";

// function getProvince() {
//     return api({
//         url:'getAllProvince',
//         method:'get'
//     })
// }

export default {
    data(){
        return{
            isShow:false,
            jobCategory:'',

            data:[{
                
            }],
        }
    },
    mounted(){
      this.$axios.get('http://regions.yangyhao.top/getAllProvince')
      .then(res =>{
          console.log(res.data);
          this.data= res.data;
      }),
      this.$axios.get('http://industry.yangyhao.top/getAllCategory')
      .then(res =>{
          console.log(res.data);
          this.jobCategory= res.data;
      })
    },
    methods:{
      show:function(){
        this.isShow = true;
        console.log("haha")
      }
    }
}
</script>

<style scoped>
   .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
