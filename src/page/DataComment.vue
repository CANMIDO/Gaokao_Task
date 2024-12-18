
<template>
  <div class="Editbox">
    <div class="title">
        <span>Data Analysis</span>
        <hr>
    </div>
    <div class="boxchild">    
      <div class="imgbox">

        <div class="comment">
            <div id="hubei"></div>
        </div>
        <div id="newCharts1" ></div>
        <div id="newCharts2"></div>
        <div id="wordcloud"></div>
        
      </div>     
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import hubeiJSON from "echarts/map/json/province/hubei"

export default {   
    name:'UserMessage',
    data() {
        return {
            wordcloud:[],
            dialogVisible: false,
        }
    },
    created() {
        axios.get('/api/image1').then(
                (res)=>{
                    console.log(res)
                    this.wordcloud = res.data
                },
                (error)=>{
                    console.log(error.message)
                }
        )
        this.$echarts.registerMap('湖北',hubeiJSON)
    },
    mounted() {
        this.echartsInit1()
        setTimeout(()=> {
            console.log(this.wordcloud)
            this.echartsInit2()
        },2000)
    },

    methods:{
        echartsInit1(){
            let mychart1 = this.$echarts.init(document.getElementById('newCharts1'))
            let option1 = {
                title:{
                    show:true,
                    text:"评论数和图片数总和",
                    x:'center'
                },
                legend:{
                    data:['图片数','评论数'],
                    
                },
                tooltip: {
                    trigger: 'item'
                },
                xAxis: {
                    data: ['黄鹤楼', '武汉大学', '东湖', '武汉长江大桥', '湖北省博物馆']
                },
                yAxis: {},
                series: [
                    {
                        // 图片
                        data: [999, 792,457, 412, 286],
                        type: 'bar',
                        stack: 'x'
                    },
                    {
                        // 评论
                        data: [480, 430,360, 180, 190],
                        type: 'bar',
                        stack: 'x'
                    }
                ]
            }
            mychart1.setOption(option1)

            let mychart2 = this.$echarts.init(document.getElementById('newCharts2'))
            let option2 = {
                title:{
                    text:'热门景点图片数量占比',
                    subtext:'从图片表中获取',
                    left:'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend:{
                    orient: 'vertical',
                    left: 'left'
                },
                series:[
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 257, name: '武汉大学' },
                            { value: 167, name: '恩施大峡谷' },
                            { value: 150, name: '黄鹤楼' },
                            { value: 144, name: '恩施土司城' },
                            { value: 107, name: '昙华林' }
                        ],
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
    
                    }
                ]
            }
            mychart2.setOption(option2)


            // 省份数据生成
            let hubeiMap = this.$echarts.init(document.getElementById('hubei'))
            let mapOption = {
                title:{
                    text:'湖北省城市景点分布图',
                    left:'center'
                },
                series:[
                    {
                        type:'map',
                        map:'湖北',
                        layoutCenter:['40%','50%'],
                        layoutSize:270,
                        label:{
                            // show:FIRST_LAST_KEYS,
                            color:'#ffffff',
                            fontsize: 10,

                        },
                        itemStyle:{
                            areacolor:"#eee",
                            bordercolor: "#24dafe",
                        },
                        // roam:true,
                        zoom:1.7,
                        emphasis: {
                            label:{
                                color:"#fff",
                                fontsize:12,
                                fontweight: "bold",
                            },
                            itemStyle:{
                                areacolor: "none",
                                bordercolor:"#77ebff",
                                borderwidth: 2,
                            },
                        },
                        data:[{name: '武汉市', value: 3252},
                            {name: '黄石市', value: 17},
                            {name: '十堰市', value: 42},
                            {name: '宜昌市', value: 433},
                            {name: '襄阳市', value: 66},
                            {name: '鄂州市', value: 9},
                            {name: '荆门市', value: 24},
                            {name: '孝感市', value: 20},
                            {name: '荆州市', value: 43},
                            {name: '黄冈市', value: 36},
                            {name: '咸宁市', value: 35},
                            {name: '随州市', value: 17},
                            {name: '恩施土家族苗族自治州', value: 70},
                            {name: '仙桃市', value: 4},
                            {name: '潜江市', value: 2},
                            {name: '天门市', value: 0},
                            {name: '神农架林区', value: 53}]
                        
                    }

                ],
                visualMap:[
                    {
                        type:'piecewise',
                        show:true,
                        pieces:[
                            {min:0,max:20},
                            {min:20,max:40},
                            {min:40,max:60},
                            {min:60,max:200},
                            {min:300,max:500},
                            {min:1000,max:5999}
                        ],
                        textStyle:{
                            color:[
                                '#313695',
                            ]
                        },
                        itemWidth:64,
                        itemHeight:12,
                        top:'top',
                        right:'0',
                        inRange:{
                            borderRadius:4,
                            color:['#313695','#4575b4','rgb(69,128,126)','#fee090','#f46d43','#a50026']
                        },
                    }

                ],
                tooltip:{
                    trigger:'item',
                    backgroundColor:'#fff',
                    borderwidth:0,
                    formatter:"地区：{b}<br/>数据：{c}"
                },
                

                
            }
            hubeiMap.setOption(mapOption)
            
        },
        
        echartsInit2(){
            let wordcloud = this.$echarts.init(document.getElementById('wordcloud'))
            let option3 = {
                title:{
                    text:'景点评论词云图',
                    left:'center'
                },
                series:[{
                    type:'wordCloud',
                    shape: 'square',
                    keepAspect: false,
                    left: 'center',
                    top: 'center',
                    width: '100%',
                    height: '90%',
                    right: null,
                    bottom: null,
                    sizeRange: [12, 60],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    drawOutOfBound: false,
                    layoutAnimation: true,
                    textStyle: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        // focus: 'self',
                        textStyle: {
                            textShadowBlur: 3,
                            textShadowColor: '#333'
                        }
                    },
                    data:this.wordcloud
                   
            }]
                
            }
            wordcloud.setOption(option3)
        },

        handleRemove(file,fileList){
            this.fileList.pop()
            console.log(file,fileList)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
      
    },
    
}
</script>

<style scoped>
#wordcloud{
    width: 600px;
    height: 400px;
    padding-left: 8%;
    padding-top: 80px;
    padding-bottom: 50px;
}
#hubei{
    width: 600px;
    height: 400px;
    padding-left: 8%;
    padding-top: 30px;
}
#newCharts1{
    /* background-color: aquamarine; */
    padding-left: 8%;
    width: 600px;
    height: 400px;
    padding-top: 80px;
}
#newCharts2{
    /* background-color: aquamarine; */
    padding-left: 8%;
    width: 600px;
    height: 400px;
    padding-top: 70px;
}
.comment{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    /* background-color: antiquewhite; */
}
.comment span{
    font-size: 20px;
    display: flex;
    /* justify-content: center; */
}
.Editbox {
    background-color: rgb(240, 240, 240);
    width: 100%;
    padding: 0 30px;
    margin: 0;
    position: relative;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.title{
    width: 100%;
    margin-top: 0;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    margin-bottom: 35px;
}
.title span{
    font-size: 20px;
}
hr{
    margin-top:3px;
    *margin: 0;
    border: 0;
    color:rgb(40,183,108);
    background-color:rgb(40,183,108); 
    height: 2.5px
}
.boxchild{
    background-color:white;
    width: 800px;
    /* height: 90vh; */
    margin-left: 15%;
    border-radius: 5px;
    padding-left: 70px;
    padding-top: 30px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-input,.el-select,.el-checkbox-group {
  width: 80%;
  height: 50px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-checkbox-group{
    height: 100%;
}
.text_input{
    width: 80%;
}
span {
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
}
.el-radio{
    margin-bottom: 10px;
}
.el-button{
    margin-top: 30px;
    margin-bottom: 40px;
}
.introduce{
    width: 80%;
}
</style>