<template>
  <div class="wrapper">
     <header>Header</header>
     <el-row class="container">
       <el-col :span="4" class="menu">
         <el-menu default-active="1">
          <el-menu-item index="1"><span><i class="iconfont icon-project"></i>  Project</span></el-menu-item>
          <el-menu-item index="2"><span><i class="iconfont icon-pipeline"></i>  Pipeline</span></el-menu-item>
          <el-menu-item index="3"><span><i class="iconfont icon-report"></i>  Report</span></el-menu-item>
        </el-menu>
       </el-col>
       <el-col :span="20" class="content">Content</el-col>
     </el-row>
  </div>
</template>

<script>
export default {
  name: 'dvs-main'
}
</script>

<style lang="scss" scoped>

@import url("//at.alicdn.com/t/font_5mecv1h38sx4unmi.css");

.wrapper {
  $vp-hight:100vh;
  $wrapper-hight:$vp-hight;
  $header-hight:$wrapper-hight*0.1;
  $container-hight:$wrapper-hight*0.9;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  height: $vp-hight;

  header {
    flex:0,0,$header-hight;
    height: $header-hight;
    padding: 0 20px;
    background-color: rgb(32, 160, 255);
  }

  .container{
    flex: 1,0,auto;
    height: $container-hight;
    .menu {
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }   
    .content{
      height: 100%;
    }
  }
}
</style>
