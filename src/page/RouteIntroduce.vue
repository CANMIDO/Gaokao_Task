<template>
  <div class="page">
    <div class="content_page">
        <!-- <div class="left">
            <div class="navigation_bar">
                <h2>推荐路线</h2>
                <el-tabs tab-position="left" style="height: 220px;" @tab-click="handleClick">
                <el-tab-pane v-for="title in titles" :key="title">
                    <span slot="label" class="fontClass">{{title}}</span>
                </el-tab-pane>
            </el-tabs>
            </div>
        </div> -->
        <div class="right">
            <div class="info_box">
                <!-- <el-card class="box-card" v-for="(title) in titles" :key="title" :id="title"> -->
                <el-card class="box-card" v-for="(data) in tableData" :key="data.Name" :id="data">
                    <div slot="header" class="clearfix">
                        <h3>{{data.Name}}</h3>
                    </div>
                  <el-form :label-position="top" label-width="100px" :model="data">

                    <el-form-item label="路线总费用">
                        <el-input v-model="data.Cost"></el-input>
                    </el-form-item>

                    <el-form-item label="路线天数">
                        <el-input v-model="data.Days"></el-input>
                    </el-form-item>


                    <el-form-item label="该行程浏览数">
                        <el-input v-model="data.Browsc"></el-input>
                    </el-form-item>


                    <el-form-item label="每天旅游路线">
                        <el-input v-model="data.ALLRoure" type='textarea'  :autosize="{minRows:1,maxRows:15}"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="buttom">
                    <!-- <el-button type="primary">保存修改</el-button> -->
                   <el-button type="danger" icon="el-icon-delete" plain :id ="data.Name" @click="deleteRoute(data.Name)">删除行程</el-button>
                  </div>
                </el-card>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { List } from 'echarts'
export default {
    name:'RouteIntroduce',
    data() {
        return {
            name:'details',
            tableData:[],
            titles:['Summary','Infomation','Annotation','Pupulation Diversity'],
        }
    },
    created() {
        axios.get('api/recommend').then(
            (res)=>{
                // console.log(res)
                let data = res.data
                let title = []
                let data_table = []
                for(let i in data){
                    title.push(data[i]['Name'])     
                    data_table.push(data[i])      
                }
                this.tableData = data_table
                
            }
        ),
        (error)=>{
            console.log(error.message)
        }
    },
    methods: {
        deleteRoute(name){
            this.$confirm('将删除数据库中该试题，是否继续？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let temp = {}
                temp.name = name
                console.log(temp)
                axios.post('/api/recommend/delete',temp).then(
                    (res)=>{
                        console.log(res)
                    },
                    (error)=>{
                        console.log(error)
                    }
                )
            })
        }
    },


}
</script>

<style>
.buttom{
    display: flex;
    justify-content: space-around;
}
.page{
    width: 100%;
    background-color: rgb(245,246,245);
    
    /* background-color: rgb(17, 192, 17); */
    /* padding: 2% 5% 0 5%; */
}
.content_page{
    padding-top: 3%;
    padding-left: 2%;
    padding-right: 2%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* background-color: rgb(39, 86, 39); */
}
.left{
    width: 28%;
    
}
.right{
    width: 70%;
    background-color: white;
}
.navigation_bar{
    text-align: left;
    background-color:white;
    width: 100%;
    padding-top: 5%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.el-tabs{
    display: flex;  /* 序列横向撑满 */
    flex-direction: column;
    
}
.fontClass{
    display: flex; /* 让字体向左靠齐 */
    font-size: 17px;
}
h3{
    font-size: 30px;
    padding-left: 1%;
    border-left: 5px solid rgb(21,196,129);
}
h2{
    
    margin-left: 5%;
    padding-left: 2%;
    border-left: 5px solid rgb(21,196,129);
}
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box-card{
   margin-bottom: 3%;
   font-size: 20px;
}

</style>