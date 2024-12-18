<template>
  <div class="page">
    <div class="box">
      <div class="imgbox" v-if="this.pieData.length">
          <div id="pie"></div>
        </div>
        <div class="title">
          <span>开设专业</span>
        </div>
        
        <div class="boxchild">
          <el-table
            :data="MajorData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            stripe
            border
            size="medium"
            >
            <template v-if="this.MajorData.length">
            <el-table-column
              prop="name"
              label="专业名称"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="level"
              label="层次"
              >
            </el-table-column>
            <el-table-column
              prop="limit_year"
              label="学制"
              >
            </el-table-column>
            <el-table-column
              prop="ruanke_level"
              label="专业评级"
              >
            </el-table-column>

            </template>

            <el-empty v-else description="暂无专业数据" ></el-empty>
          </el-table>
        </div>
        
    </div>
  </div>
  
</template>

<script>
// import axios from 'axios'
export default {
  name:'ExamCourse',
  props: {
    profession:{type:Object},
  },
  data() {
      return {
        MajorData:[
            {
                name:'中医学',
                level:'本科',
                date:'五年',
                grade:'国家特色专业',
            },
            {
              name:'计算机',
                level:'本科',
                date:'四年',
                grade:'A+',
            }
        ],
        pieData: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
        ],
      }
  },
  created() {
    this.MajorData = this.profession.special
    this.pieData = this.profession.special_num
  },
  mounted() {
    this.echartsInit()
  },
  
  methods:{
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
    // },
    
    echartsInit(){
      let pieImg = this.$echarts.init(document.getElementById('pie'))
      let option = {
        title:{
          text:'专业分布图',
          left:'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                // show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.pieData
          }
        ]
      };
      pieImg.setOption(option)
    },

  },

  

}
</script>

<style scoped>
.page{
    /* position: relative; */
    width: 100%;
    height: 100%;
    /* background-color: rgb(175, 77, 77); */
    background-color: rgb(240, 240, 240);
    background-color: white;
    padding: 0 auto;
    padding-bottom: 4%;
}
.box{
  padding: 0 auto;
  height: 100%;
}
.title{
    width: 100%;
    margin-top: .1%;
    padding-top: 1%;
    padding-left: 1%;
    height: 30px;
    line-height: 20px;
    font-size: 15px;
}
.title span{
    font-size: 16px;
    font-weight: bold;
}
.boxchild{

    border-radius: 5px;
    /* padding-left: 70px;
    padding-top: 30px; */
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-table{
    font-family: "Microsoft YaHei",宋体,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
    text-align: center;
}
#pie{
  width: 600px;
  height: 400px;
  margin-left: 18%;
  padding-top: 3%;
}
span{
    font-family: "Microsoft YaHei",宋体,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 13px;
}
</style>