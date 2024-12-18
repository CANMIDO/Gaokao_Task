<template>

  <div class="container">
    <el-container>
      <el-main>
        <el-card class="card-container">
          <div class="image">
            <el-image             
             :src="require('@/assets/images/logo4.jpg')"           
            >
            </el-image>
          </div>

          <div class="big-wrapper" style="margin-top: 10px">
            <!-- 第一部分搜索框 -->
            <el-card class="SearchBox-card">
              <el-input
                prefix-icon="el-icon-search"
                v-model="keyword"
                  
                @keyup.enter.native="enterFun"
                clearable
                placeholder="输入ID"
              >
              </el-input>  
              <el-radio v-model="radio" label="1" class="Sectype">输入为UserID</el-radio>
              <el-radio v-model="radio" label="2" class="Sectype">输入为喜欢的Movie ID</el-radio>
                     
            </el-card> 
              
          </div>

          <div class="page">
            <div class="box">
                <div class="coursebox">
                  <h5>推荐电影TOP 10</h5>
                  <hr>
                  <div class="course_item"
                  v-for="(item,index) in MovieList" :key="index">
                  <span class="badge">{{index + 1}}</span>
                  <strong><a class="course_name">{{item.name}}</a></strong>

                  <span class="hot">电影类型：{{item.type}}</span>
                  <hr>
                  </div>
                </div>
            </div>
          </div>

        </el-card>

      </el-main>
    </el-container>
  </div>
</template>
  
<script >
import axios from 'axios'

// import china from 'echarts/map/json/china.json'
export default{
  name:'MyTest',
  data() {
    return {
      keyword:'',   //绑定的搜索的ID
      MovieList: [],
      radio:'',
    }
  },

  created(){
    axios.post("/api/list").then(
        (response)=>{
          console.log(response);
          this.MovieList = response.data
        },
        (error)=>{
            console.log(error.message);
        }
      );
  },

  methods: {
    //输入关键字后访问学校的详情界面，需要完善搜索的学校不存在的功能
    enterFun(){
      axios.post("/api/search",{keyword:this.keyword,type:this.radio}).then(
        (response)=>{
          console.log(response);
          this.MovieList = response.data
        },
        (error)=>{
            console.log(error.message);
        }
      );
    },

    onQuery() {
        this.$refs[this.activeName].getList();
    },

    async querySearch(queryString, cb) {
      await this.fuzzyQuery(queryString);   //调用模糊查询函数
      // clearTimeout(this.timeout);this.timeout = setTimeout(() => { 				
      //   cb(this.recipientTips);}, 1000 * Math.random());
      
      
      var SchoolList = this.SchoolList;
      cb(SchoolList);
    },

    /**
     * 模糊查询：需要后台进行模糊查询的，都调用此方法，后端会自动返回过滤好的数据
     * @param reqJson 查询条件需要的参数
     */
    async fuzzyQuery(queryString) {
      await axios.post("/api/search",{keyword:queryString,status:0}).then(
        (response)=>{
          // console.log('-----------此时收到后端回复-----------');
          this.SchoolList = response.data
        },
        (error)=>{
            console.log(error.message);
        }
      );
    },
    
    handleSelect(item) {
      this.keyword = item.value;
      this.enterFun();
      // console.log(item.value);
    }
    
    
  },

  
}

</script>
  
<style scoped>
.image{
  /* background-color: rgb(37, 174, 174); */
  display: flex;
  justify-content: center;
  height: 100px;
}
.container{
  height: 100%;
  background: url('~@/assets/images/bg3.jpg');
}
.el-container{
  height: 100%;

}
.card-container {
  width: 80%;
  border-radius: 50px;
  margin: auto;
  background-color: rgba(246,246,246,.4);
  /* background-color: rgba(38,208,181,.2); */
}
.TabsBox{
  width: 90%;
  margin: auto;

}
.el-tabs{
  display: flex;
  justify-content: center;
}

.card-container .SearchBox-card {
  border-radius: 20px;
  /* background-color: #999999; */
  background-color: rgba(216,236,243,0.2);
  
}
.page{
    width: 90%;
   margin: auto;
    /* position: relative; */
    background-color: transparent;
}
.box{
  width: 100%; 
  background-color: transparent;
  /* background-color: pink; */
}

.big-wrapper {
  width: 90%;
  margin: auto;
  /* background-color: aqua; */
}

.container-wrapper {
  width: 70%;
  margin: auto;
}

.searchtable {
  margin-bottom: 20px;
  background-color: blueviolet;
}

.SearchBox-card {
  margin: 20px;
  margin-bottom: 40px;
}
.Sectype{
  margin-top: 2%;
  margin-left: 22% ;
}
.el-autocomplete{
    /* background-color: blueviolet; */
    width: 100%;
    background-color: transparent;
}


.search-button :deep(.el-button) {
  height: 30px;
}

.search-input-container .search-input {
  color: rgb(85, 123, 116);
}

.search-input-container .search-input .el-input {
  margin-left: 10px;
  border-block-color: rgb(85, 123, 116);
}
.search-input-container .el-button {
  /* color: #fff; */
  line-height: 1;
  align-items: center;
  padding: 0px 20px;
}

.search-input-container .el-button:focus,
.el-button:hover .el-button {
  background: rgb(85, 123, 116);
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