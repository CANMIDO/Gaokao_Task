<template>
  <div class="page">
    <div class="box">
        <div class="title">
          <span>院校分数线</span>
          <div class="option">
            <el-select v-model="optionvalue" placeholder="请选择省份"
             @change="selectTrigger()"
            >
              
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              
            </el-select>
          </div>

        </div>
        <div class="boxchild">
          
          <el-table
            :data="PlanData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            stripe
            border
            size="medium"
            >
            <el-table-column
              prop="year"
              label="年份"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="score_type"
              label="分科"
              >
            </el-table-column>
            <el-table-column
              prop="province"
              label="地区"
              >
            </el-table-column>
            <el-table-column
              prop="score"
              label="最低录取线"
              >
            </el-table-column>
          </el-table>

            
        </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name:'ExamCourse',
  data() {
      return {
        PlanData:[
        ],
        options: [{
          value: '北京',
          label: '北京市'
        }, {
          value: '天津',
          label: '天津市'
        }, {
          value: '河北',
          label: '河北省'
        }, {
          value: '山西',
          label: '山西省'
        }, {
          value: '内蒙古',
          label: '内蒙古自治区'
        }, {
          value: '辽宁',
          label: '辽宁省'
        }, {
          value: '吉林',
          label: '吉林省'
        }, {
          value: '黑龙江',
          label: '黑龙江省'
        }, {value:'上海',label:'上海市'}, {value:'江苏',label:'江苏省'}, {value:'浙江',label:'浙江省'}, {value:'江西',label:'江西省'}, {value:'山东',label:'山东省'}, 
        {value:'安徽',label:'安徽省'}, {value:'福建',label:'福建省'}, {value:'湖北',label:'湖北省'}, {value:'河南',label:'河南省'}, 
        {value:'湖南',label:'湖南省'}, {value:'广东',label:'广东省'}, {value:'广西',label:'广西壮族自治区'}, {value:'海南',label:'海南省'},  
        {value:'四川',label:'四川省'}, {value:'澳门',label:'澳门市'}, {value:'重庆',label:'重庆市'}, {value:'贵州',label:'贵州省'}, {value:'云南',label:'云南省'}, 
        {value:'西藏',label:'西藏自治区'}, {value:'陕西',label:'陕西省'}, {value:'甘肃',label:'甘肃省'}, {value:'青海',label:'青海省'}, {value:'宁夏',label:'宁夏省'}, {value:'新疆',label:'新疆维吾尔族自治区'}, 
        ],
        optionvalue: '北京',
        show:true,
      }
  },
  created() {
    axios.post("/api/detail/pro",{keyword:'北京'}).then(
        (response)=>{
          console.log(response)
          this.PlanData = response.data
          if(this.PlanData.length === 0){
            this.PlanData = [
              {
                year:'暂无信息',
                score_type:'暂无信息',
                province:'暂无信息',
                score:'暂无信息',
              }
            ]
          }
        },
        (error)=>{
            console.log(error.message);
        }
      );
  },

  methods:{
    getList(){
        console.log('EnrollPlan的已被调用');
        //在下面完善接口信息
    },
    selectTrigger(){
      console.log(this.optionvalue)
      axios.post("/api/detail/pro",{keyword:this.optionvalue}).then(
        (response)=>{
          console.log(response)
          this.PlanData = response.data
        },
        (error)=>{
            console.log(error.message);
        }
      );
    },


    // EnterExam(index,rowObj){
    //   console.log(rowObj);
    //   //拿到课程ID(rowObj.id）申请试卷
    //   if(rowObj.examnumber === 3){
    //     this.$alert('已经参加过三次考试！')
    //     return;
    //   }
    //   let temp = {};
    //   temp.courseid = rowObj.courseid;
    //   console.log(temp)
    //   axios.post('/api/online_ems/teacourselist/seetestpaper',temp).then(
    //     (res)=>{
    //       //希望res中包含试卷信息
    //       console.log(res.data);
    //       sessionStorage.setItem('course',JSON.stringify(res.data))
    //     },
    //     (error)=>{
    //       console.log(error.message)
    //     }
    //   )
    //   let id = localStorage.getItem('id');
    //   this.$router.push({path:'/examing',query:{courseid:rowObj.courseid,id:id}});
    // }
  },
  
}
</script>

<style scoped>
.page{
    width: 100%;
    background-color: white;
    padding: 0 auto;
    padding-bottom: 4%;
}
.box{
  padding: 0 auto;
}
.title{
    width: 100%;
    margin-top: .1%;
    padding-top: 1%;
    padding-left: 1%;
    height: 50px;
    line-height: 20px;
    font-size: 15px;
}
.option{
  float: right;
  margin-right: 5%;
}
.title span{
    font-size: 16px;
    font-weight: bold;
}
.boxchild{

    border-radius: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-table{
    font-family: "Microsoft YaHei",宋体,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
    text-align: center;
}
span{
    font-family: "Microsoft YaHei",宋体,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 13px;
}
</style>