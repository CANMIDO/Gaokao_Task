
<template>
  <div class="Editbox">
    <div class="title">
        <span>景点信息</span>
        <hr>
    </div>
    <div class="boxchild">
      
      <el-form ref="form" 
      :model="spot" 
      label-width="120px"
      label-position="left">
        <el-form-item>
            <span slot="label">
                <span>景点名称</span>
            </span>
            <el-input v-model="spot.Name" :disabled='true'></el-input>
        </el-form-item>

        <el-form-item>
        <span slot="label">
                <span>地址</span>
            </span>
            <el-input v-model="spot.Address" :disabled='true'></el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>门票</span>
            </span>
            <el-input v-model="spot.Tickets" :disabled='true'></el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>开放时间</span>
            </span>
            <el-input v-model="spot.Open_hours" :disabled='true'></el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>景点介绍</span>
            </span>
            <el-input  class="content" v-model="spot.Content" type='textarea' :autosize="{minRows:1,maxRows:8}"></el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>图片展示</span>
            </span>
             <el-image :src="getImageUrl()" class="pic"></el-image>
             <!-- <el-image :src="require('@/assets/images/黄鹤楼.png')" ></el-image> -->
             
        </el-form-item>


        <el-form-item class="button">
            <el-button type="primary" @click="onSubmit">
                <span>修改并保存</span>
            </el-button>
            <!-- <el-button>
                <span>取消</span>
            </el-button> -->
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'UserMessage',
    data() {
        return {
            imgName:"黄鹤楼",
            spot:{
                ID:'',
                Address:'暂无该信息',
                Name:'黄鹤楼',
                Open_hours:'暂无该信息',
                Tickets:'暂无该信息',
                Content:'黄鹤楼位于中国湖北省武汉市武昌蛇山上，是江南四大名楼之一，中国国家旅游胜地四十佳之一。黄鹤楼共5层，高50.4米。始建于三国时代吴黄武二年，历代屡修屡毁，现在我们看到的黄鹤楼是于1985年重修的。'
            },
        }
    },

    methods:{
        getImageUrl(){
            return require ('@/assets/images/'+this.imgName+'.jpg')
        },
        onSubmit(){
            axios.post('/api/detail/edit',this.spot).then(
                (res)=>{
                    console.log(this.spot)
                    console.log(res.data)
                },
                (error)=>{
                    console.log(error.message)
                }
            )
            
        }
      
    },
    created() {
        axios.get('api/detail').then(
            (res)=>{
                console.log(res)
                for(let key in res.data.data){
                    this.spot[key] = res.data.data[key]
                    this.imgName = res.data.data['Name']
                }


            }
        ),
        (error)=>{
            console.log(error.message)
        }
    },
}
</script>

<style scoped>

.content{
    width: 80%;
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
    width: 700px;
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
.pic{
    width: 80%;
}
</style>