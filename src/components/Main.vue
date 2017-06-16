<template>
  <div class="wrapper">
     <header>Header</header>
     <el-row class="container">
       <el-col :span="4" class="menu">
         <el-menu default-active="1">
          <el-menu-item index="1">Project</el-menu-item>
          <el-menu-item index="2">Pipeline</el-menu-item>
          <el-menu-item index="3">Report</el-menu-item>
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
.wrapper {
  position: relative;
  height: 100%;
  header {
    height: 80px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    box-sizing: border-box;
  }

  .container{
    height: 100%;
    padding-top: 80px;

    .menu {
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }

    .content {
      padding: 25px;
    }
  }
}
</style>
