<template>
  <div class="header">
    <div class="box">
      <span>基于Flink的电影推荐系统</span>
    </div>
  </div>
</template>
<script>
export default {
    name:'UserHeader',
}
</script>

<style scoped>
.header{
  /* background-color:rgb(40,183,108); */
  /* background-color:rgb(64,158,255); */
  display: flex;
  width: 100%;
  height: 60px;
}
.box{
  /* background-color:rgb(40,183,108); */
  background-color:rgb(30, 116, 197);
  /* background:rgb(121,164,199); */
  width: 100%;
  height: 45px;
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 15px;
}
span{
  font-family: "Microsoft YaHei","Arial","Hiragino Sans GB","Helvetica","sans-serif";
  font-size: 25px;
  font-weight: bold;
  color: whitesmoke;
}
</style>