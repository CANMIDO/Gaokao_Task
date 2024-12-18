<template>
  <div class="page">
    <div class="box">
        <div class="coursebox">
          <h5>TOP 20</h5>
          <hr>
          <div class="course_item"
          v-for="(item,index) in list" :key="index">
          <span class="badge">{{index + 1}}</span>
          <strong><a class="course_name" @click="Revice(item.hightitle)">{{item.hightitle}}</a></strong>

          <span class="hot">热度值：{{item.view_total_number}}</span>
          <hr>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'TeacherCourse',
  data() {
    return {
      list:[],
    }
  },
  methods:{
    Revice(sname){    //点击名字以后跳转到详情界面
      axios.post("/api/search",{keyword:sname,status:1}).then(
        (response)=>{        
          this.$router.push("/detail");
          console.log(response); 
        },
        (error)=>{
            console.log(error.message);
        }
      );
    }
  },
  created(){
      //通过接口拿到数据信息进行展示
        axios.get("/api/top").then(
        (response)=>{
          // console.log(response.data)
          this.list = response.data
        },
        (error)=>{
            console.log(error.message);
        }
      );
  },
}
</script>

<style scoped>
.page{
    width: 100%;
    margin: 0;
    position: relative;
    background-color: transparent;
}
.box{
  width: 100%; 
  background-color: transparent;
  /* background-color: pink; */
}

hr{
    margin-top:3px;
    *margin: 0;
    border: 0;
    color:rgb(60,140,189);
    background-color:rgb(60,140,189); 
    height: 2.5px
}
span{
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 13px;
}
.coursebox{
  /* background-color: blueviolet; */
  margin:0 5%;
  /* 修改左右边距 */
  
}
.course_item{
  /* background-color: bisque; */
  padding-top: 14px;
  height: 36px;
  line-height: 36px;
}
.hot {
  font-size: 14px;
  color:#366392;
  float: right;
}
h5{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 25px;
}
.badge{
    display: inline-block;
    padding: .25em .5em;
    margin-right: 5px;
    color: #fff;
    background-color: #007bff;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
strong{

    font-size: 17px;
    text-decoration: none;
    background-color: transparent;
    /* background-color: aqua; */
}
.course_name{
 color:#366392;
 margin-left: 10px;
}
strong:hover{
  text-decoration: underline;
  cursor: pointer;
}
.coursebox hr{
   /* margin-top:10px; */
    *margin: 0;
    border: 0;
    /* color:rgb(222,226,230); */
    background-color:rgb(222,226,230); 
    height: 1px;
}
</style>