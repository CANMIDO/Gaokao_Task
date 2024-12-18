<template>
<div class="page">
    <div class="Sidebox">
    <div class="boxchild">
      <el-col :span="12">
        <el-menu
          class="el-menu-vertical"
          background-color="rgba(240,245,249,4)"
          router
          >
        <el-menu-item index="1" route="/enter/detail" active-text-color="rgb(40,183,108)">
            <i class="el-icon-user"></i>
            <span slot="title">景点详细信息展示</span>
        </el-menu-item>

        <el-menu-item index="2" route="/enter/comment" active-text-color="rgb(40,183,108)">
            <i class="el-icon-user"></i>
            <span slot="title">Comment</span>
        </el-menu-item>

        <el-menu-item index = "3" route="/enter/recommand" active-text-color="#178EF1" >
            <i class="el-icon-pie-chart"></i>
            <span slot="title">路线推荐 </span>
        </el-menu-item>
        </el-menu>
    </el-col>
    </div>    
    </div>
    <router-view></router-view>
</div>
  
</template>

<script>
export default {
  name:"SideBar",
  data() {
    return {
        isTeacher:true,
    }
  },
  
  methods:{
    quit(){
        this.$confirm('确定退出登录？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.LogOut('');
          this.$router.push('/login');
        });
    },
    toResult(){
      this.$router.push({
        path:'/enter/courseList',
        query:{
          from:'result'
        }
      })
    },
    toEdit(){
      this.$router.push({
        path:'/enter/courseList',
        query:{
          from:'edit'
        }
      })
    }
  }
}
</script>

<style scoped>
/* 需要做样式调整，二级列表高亮会超出边界区域 */
.page{
    display: flex;
    justify-content: flex-start;
}
.Sidebox{
    /* background-color: rgb(232, 25, 91); */
    width: 220px;
}
.boxchild{
    width: 220px;
    display: flex;
    background-color: rgb(174, 209, 253);
}
/* h5{
    text-align: center;
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
} */
.el-menu{

    text-align: left;
    width: 220px;
    height: 290vh;
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 18px;
}
.el-menu-item-group{
    padding-left: 0;
    margin-left: 0;
}
</style>