<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="main">
                <el-card class="box-card left">
                    <span>已有公司？直接绑定</span>
                </el-card>
                <el-card class="box-card right">
                    <span>没有公司？立即认证</span>
                </el-card>
            </div>
        </el-col>
    </el-row>
    
</template>
<style lang="scss" scoped>
.main{
    display: block;
    margin-top: 15%;
}
.box-card{
    width: 400px;
    height: 300px;
}
.left{
    float: left;
}
.right{
    float: right;
}
</style>

