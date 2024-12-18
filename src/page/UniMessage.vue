<template>
  <div class="body">
    <div class="msgbox">
      <div class="msg1">
        <el-descriptions class="margin-top" title="学校详细信息" :column="2" :size="size" border
            :v-model="schoolData"
        >
            <!-- <template slot="extra">
              <el-button type="primary" size="small">操作</el-button>
            </template> -->

            <el-descriptions-item >
                <template slot="label">
                    <i class="el-icon-user"></i> 学校名字
                </template>
                {{schoolData._id}}
            </el-descriptions-item>

            <el-descriptions-item>
            <template slot="label">
                <i class="el-icon-location-outline"></i>学校地址
            </template>
              {{schoolData.province}}
            </el-descriptions-item>
                    
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>学校隶属
                </template>
                 {{schoolData.belong}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>备注
                </template>
            <el-tag size="small" v-for="(d,index) in schoolData.attribute" :key="index">{{d}}</el-tag>
            <!-- <el-tag size="small">双一流</el-tag> -->
            </el-descriptions-item>

            <el-descriptions-item v-for="(r,index) in schoolData.rank" :key="index">
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    {{r.name}}排名
                </template>
                 {{r.value}}
            </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="msg2">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch=true>
            <el-tab-pane label="开设专业" name="first">
                <span slot="label" style="font-size:18px;">
                    <i class="el-icon-s-grid" style="margin:0 10px 0 10px">
                        <span style="padding-left: 8px;font-weight:bold;">开设专业</span>
                    </i>
                </span>
                <MajorMsg v-if="activeName == 'first'" ref="pmsg" :profession="JSON.parse(JSON.stringify(this.schoolData.profession))"></MajorMsg>
            </el-tab-pane>
            <el-tab-pane label="分数 / 计划" name="second">
             <span slot="label" style="font-size:18px;">
                <i class="el-icon-s-order" style="margin:0 10px 0 10px">
                    <span style="padding-left: 8px;font-weight:bold;">分数 / 计划</span>
                </i>
             </span>
                <EnrollPlan v-if="activeName == 'second'" ref="emsg"></EnrollPlan>
            </el-tab-pane>
        </el-tabs>
      </div>

    </div>
  </div>
</template>

<script>
import MajorMsg from './MajorMsg.vue';
import EnrollPlan from './EnrollPlan.vue'
import axios from 'axios'
export default {
    name:'UniMessage',
    components:{
        MajorMsg,
        EnrollPlan,
    },

    data() {
        return {
            schoolData:{province:'四川'},
            activeName: 'first',
            
        }
    },
    created() {
        axios.get("/api/detail").then(
        (response)=>{
        //   console.log(response.data[0])
          this.schoolData = response.data[0]
          for (let i = 0;i <this.schoolData.rank.length;i ++){
            if(this.schoolData.rank[i].name === 'ruanke'){
                this.schoolData.rank[i].name = '软科'
            }
            else if(this.schoolData.rank[i].name === 'xyh'){
                this.schoolData.rank[i].name = '校友会'
            }
          }

          for(var i = 0;i < this.schoolData.attribute.length;i ++){
            if(this.schoolData.attribute[i] === ""){        
                this.schoolData.attribute.splice(i, 1);
            }
          }
        //   JSON.parse(JSON.stringify(this.schoolData.profession))
        //   console.log(JSON.parse(JSON.stringify(this.schoolData.profession)))

        },
        (error)=>{
            console.log(error.message);
        }
      );
    },
}
</script>

<style>
html {
    height: 100%;
}
.body {
    width: 100%;
    /* height: 200vh; */
    height: 100%;
    background-color: rgb(240, 240, 240);
    padding: 0 auto;
    /* padding-bottom: 2%; */
}
.msgbox {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', 微软雅黑, sans-serif;
}
.msg1 {
    padding-top: 2%;
    
}
.el-descriptions {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', 微软雅黑, sans-serif;
    font-size: 15px;
}
.msg2{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', 微软雅黑, sans-serif;
    font-size: 20px;
    margin-top: 2%;
    /* padding-bottom: 2%; */
}
</style>